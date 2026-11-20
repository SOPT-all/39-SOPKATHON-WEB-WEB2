# AGENTS.md

AI 코딩 에이전트(Codex, Claude Code 등)가 이 저장소에서 작업할 때 따르는 규칙이에요.
이 파일이 **규칙의 단일 원본**이에요. `CLAUDE.md`는 이 파일을 불러오니, 규칙을 바꿀 때는 여기만 수정해요.

## 프로젝트 개요

- SOPT 39기 솝커톤 웹 2조 (React SPA)
- 무박 2일 해커톤이에요. **코드의 완성도보다 동작하는 결과물이 먼저**예요.
- 저장소: `SOPT-all/39-SOPKATHON-WEB-WEB2`
- 배포 주소: https://39-sopkathon-web-web2.vercel.app

## 작업 원칙

- 핵심 기능이 먼저 돌아가게 만들어요. 리팩토링, 추상화, 최적화는 요청받았을 때만 해요.
- 요청받지 않은 파일은 건드리지 않아요.
- 아래 기술 스택에 없는 패키지는 **사용자에게 먼저 확인받고** 설치해요.
- API를 붙일 때는 명세만 믿지 말고 실제 응답을 찍어서 구조를 확인해요.

## 기술 스택

| 분류 | 기술 |
| --- | --- |
| UI · 언어 | React 19, TypeScript |
| 빌드 | Vite |
| 패키지 매니저 | **pnpm만 사용** (npm, yarn 금지) |
| 라우팅 | React Router (`react-router`, `react-router/dom`) |
| 네트워크 | Axios (인스턴스는 `shared/api/config/axios-instance.ts`) |
| 스타일 | Tailwind CSS v4, `cn` 유틸 (clsx + tailwind-merge) |
| SVG | vite-plugin-svgr (`?react`로 불러오면 컴포넌트) |
| 린트 · 포맷 | ESLint, Prettier (`prettier-plugin-tailwindcss`) |
| 배포 | Vercel, GitHub Actions |

- 환경: Node.js 22 (`.nvmrc`), pnpm 12 (`packageManager` 필드)
- 환경 변수는 `VITE_` 접두어를 써요 (예: `VITE_API_BASE_URL`). `.env`는 커밋하지 않아요.

## 명령어

```bash
pnpm install
pnpm dev            # 개발 서버 (http://localhost:5173)
pnpm build          # 타입 검사 + 프로덕션 빌드
pnpm lint           # ESLint 검사 (자동 수정: pnpm lint:fix)
pnpm format         # Prettier 적용 (검사만: pnpm format:check)
```

작업을 마치면 `pnpm lint`, `pnpm format:check`, `pnpm build`가 통과하는지 확인해요.

## 폴더 구조

```
src
├── app                 # 앱 진입점 (main.tsx, App.tsx)
├── pages
│   └── home            # 페이지별 폴더
│       └── home-page.tsx
├── routes
│   └── router.tsx
└── shared
    ├── api/config      # axios 인스턴스
    ├── assets
    │   ├── icons       # ic-이름.svg
    │   └── images      # img-이름.png
    ├── components      # 공통 컴포넌트
    ├── constants       # ROUTES 등
    ├── hooks
    ├── styles          # global.css (테마 토큰은 @theme 안에)
    ├── types
    └── utils           # cn 등
```

- 한 페이지에서만 쓰면 `pages/페이지명/` 안에 두고, 두 페이지 이상에서 쓰면 `shared/`로 올려요.
- 페이지 전용 코드는 `pages/페이지명/` 아래에 `components`, `api`, `hooks` 폴더를 만들어 넣어요.

### 새 페이지를 추가할 때

1. `src/pages/페이지명/페이지명-page.tsx`를 만들어요.
2. `src/shared/constants/routes.ts`의 `ROUTES`에 경로를 추가해요.
3. `src/routes/router.tsx`에 한 줄 추가해요.

## 코드 컨벤션

- 폴더 · 파일명은 kebab-case (`search-bar.tsx`, `use-user.ts`)
- 컴포넌트 · 타입은 PascalCase, 변수 · 함수는 camelCase, 상수는 `UPPER_SNAKE_CASE`
- 컴포넌트는 화살표 함수 + `default export`, 한 파일에 한 컴포넌트
- 커스텀 훅 · 유틸 · 상수는 `named export`
- 이벤트 핸들러는 `handle~`, Props로 넘길 때는 `on~`
- Props 타입은 `~Props`, `any`는 쓰지 않아요
- import는 `../` 대신 `@/` 절대 경로
- 조건부 클래스나 외부 `className` 병합은 `cn`을 써요
- 클래스 순서는 Prettier가 정렬하니 직접 맞추지 않아요

## 화면 구현 규칙

Figma 디자인을 코드로 옮길 때 따르는 규칙이에요. 세 명이 각자 AI로 화면을 만들어도 같은 결과가 나오게 해요.

### 스타일

- 색상과 폰트는 `src/shared/styles/global.css`의 `@theme`에 있는 토큰만 써요. `#3B82F6`, `text-[#333]`처럼 값을 직접 쓰지 않아요.
- 필요한 토큰이 없으면 값을 직접 쓰지 말고 `@theme`에 토큰을 추가해요. 이름은 Figma의 변수 이름을 따라요.
- Figma가 내준 코드를 그대로 붙이지 않아요. 이 저장소의 토큰, 컴포넌트, 코드 컨벤션에 맞게 고쳐 써요.

### 컴포넌트

- 만들기 전에 `src/shared/components`에 이미 있는지 먼저 찾아요.
- 두 화면 이상에서 쓰면 `src/shared/components`, 한 화면에서만 쓰면 `src/pages/페이지명/components`에 둬요.

### 에셋

- 아이콘은 `src/shared/assets/icons/ic-이름.svg`, 이미지는 `src/shared/assets/images/img-이름.png`로 저장해요.
- Figma에서 내려받은 에셋만 써요. 아이콘 패키지를 설치하거나 다른 이미지로 대신하지 않아요.
- SVG 아이콘은 `?react`를 붙여 컴포넌트로 불러와요.

  ```tsx
  import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

  <IcSearch className="size-6" />;
  ```

- 코드에서 색을 바꿀 아이콘은 SVG 파일의 `fill`, `stroke` 값을 `currentColor`로 바꿔 두고 글자색 클래스로 색을 정해요.

### API

- API 함수와 타입은 한 페이지 전용이면 `src/pages/페이지명/api`, 여러 페이지에서 쓰면 `src/shared/api`에 둬요.
- 요청은 `@/shared/api/config/axios-instance`의 `axiosInstance`로 보내요.
- 응답 타입은 `@/shared/types/api`의 `ApiResponse<T>`로 감싸요. 화면에 쓸 데이터는 `res.data.data`예요.
- 명세만 믿지 말고 실제 응답을 찍어서 구조를 확인해요. 다르면 `src/shared/types/api.ts`를 맞춰요.

## Git 워크플로우

- `main`: 배포 브랜치, `develop`: 통합 브랜치(기본 브랜치). **둘 다 직접 push 금지.**
- 순서: **이슈 생성 → 담당자 지정 → 브랜치 자동 생성 → 커밋 → `develop`으로 PR → 머지**
- `main`에는 `develop`에서 올리는 릴리즈 PR로만 반영해요. `main`에 머지되면 자동으로 배포돼요.
- 리뷰는 충돌이 없으면 생략하고 본인이 머지해요.

### 작업 순서

브랜치와 라벨은 GitHub Actions가 만들어요. **브랜치를 직접 만들거나 라벨을 직접 붙이지 않아요.**

1. **이슈를 만들어요.** 제목은 `[타입] 내용`이고, 본문은 아래 "이슈 본문 형식"을 그대로 따라요.
2. **담당자(Assignees)를 지정해요.** 지정하는 순간 `develop`에서 `타입/기능명/#이슈번호` 브랜치가 만들어지고, 이슈에 안내 댓글이 달려요.
3. **브랜치를 받아서 작업해요.** 브랜치 이름에 `#`이 있으니 따옴표로 감싸요.

   ```bash
   git fetch origin
   git checkout "feat/login-page/#12"
   ```

4. **`develop`으로 PR을 열어요.** 제목은 `타입: 내용`, 본문은 `.github/pull_request_template.md` 형식이에요.
5. **CI가 통과하면 머지해요.** 머지된 브랜치는 자동으로 지워져요.

브랜치가 만들어지지 않았다면 이슈에 이유가 댓글로 달려요. 제목이나 브랜치 기능명을 고친 뒤 담당자를 다시 지정해요. 그래도 안 되면 `develop`에서 같은 이름으로 직접 만들어요.

### 이슈 본문 형식

GitHub 화면에서는 타입별 이슈 폼(Init, Feat, Fix, Docs, Chore)을 골라요. `gh` 같은 CLI로 만들 때는 폼을 쓸 수 없으니 본문을 아래 형식으로 직접 적어요. 브랜치 자동 생성이 `🌿 브랜치 기능명` 제목과 그 아랫줄을 읽기 때문에, 이 제목은 글자 그대로 써야 해요.

```markdown
### 🛠️ 작업 내용

무엇을 왜 하는지 적어요.

### 📌 세부 작업

- [ ] 할 일

### 🌿 브랜치 기능명

login-page

### 🔗 참고 자료

_No response_
```

- 브랜치 기능명은 영문 소문자, 숫자, 하이픈만 써요. 타입과 이슈 번호는 넣지 않아요.
- 첫 제목은 타입마다 달라요. Fix는 `🐛 문제 상황`, Docs는 `📝 작업 내용`, 나머지는 `🛠️ 작업 내용`이에요.

### 자동으로 되는 것

| 언제 | 자동으로 되는 일 |
| --- | --- |
| 이슈에 담당자를 지정하면 | 브랜치를 만들어 이슈에 연결하고, 안내 댓글을 달아요 |
| 이슈나 PR을 열거나 제목을 고치면 | 제목의 타입을 읽어 타입 라벨을 붙여요 |
| 이슈에 담당자를 지정하거나 PR을 열면 | 이슈는 담당자, PR은 작성자 기준으로 이름 라벨을 붙여요 |
| PR을 열거나 제목을 고치면 | 제목이 `타입: 내용` 형식이 아니면 안내 댓글을 달아요. 고치면 댓글이 지워져요 |
| PR을 열거나 커밋을 올리면 | 린트 · 포맷 · 빌드 검사, 미리보기 배포, 디스코드 알림이 돌아요 |
| `main`에 머지되면 | 실제 주소에 배포하고 결과를 디스코드로 알려요 |

- 자동화는 실패해도 작업과 머지를 막지 않아요. 댓글이나 표시만 남겨요.
- 라벨은 `🌱 init`, `✨ feat`, `🐛 fix`, `📝 docs`, `🛠️ chore`와 이름 라벨 `🌙 종현`, `🍵 보성`, `🐱 현영`이에요. 새로 만들거나 이름을 바꾸지 않아요.
- PR에 달리는 "Discord 알림 연동용 댓글"은 고치거나 지우지 않아요. 디스코드 스레드와 연결이 끊겨요.
- PR에 AI 자동 리뷰 댓글이 달릴 수 있어요. 기다리지 않고 머지하고, 지적된 내용은 다음 PR에서 고쳐요.
- 릴리즈 PR(`develop` → `main`)은 사용자가 시켰을 때 직접 열어요. 제목은 `chore: 내용 main 반영`으로 쓰고, 제목 검사 대상이 아니에요.

### 이름 규칙

| 어디에 | 형식 | 예시 |
| --- | --- | --- |
| 이슈 제목 | `[타입] 내용` | `[Feat] 로그인 페이지 구현` |
| 브랜치 | `타입/기능명/#이슈번호` | `feat/login-page/#12` |
| PR 제목 | `타입: 내용` (이슈 내용 그대로) | `feat: 로그인 페이지 구현` |
| 커밋 메시지 | `타입: 내용` (작업 단위마다 따로) | `feat: 로그인 폼 추가` |

- PR 하나에 커밋은 여러 개여도 돼요. 작업 단위로 나눠서 커밋해요.
- 브랜치의 기능명은 영어 kebab-case로 써요.

### 타입

| 타입 | 언제 |
| --- | --- |
| `init` | 초기 세팅 |
| `feat` | 기능 추가 |
| `fix` | 버그 수정 |
| `chore` | 설정, 패키지, CI 등 기타 |
| `docs` | README 같은 문서 |

- 타입은 이 5개만 써요. 화면 작업은 `feat`, 깨진 화면 수정은 `fix`로 올려요.

### 이슈 · PR 작성

- 이슈는 위의 "이슈 본문 형식", PR은 `.github/pull_request_template.md` 형식을 따라요.
- 이슈에는 담당자(Assignees)를 꼭 지정해요. 라벨은 자동으로 붙으니 직접 붙이지 않아요.
- PR 본문의 `## 🔗 관련 이슈`에 `- close #이슈번호`를 꼭 적어요. 이슈 번호는 브랜치 이름 끝의 `#번호`예요. 머지될 때 이슈가 닫히고, 디스코드 알림이 이 글자를 읽어 연관 이슈를 표시해요.
- 이슈, PR, 커밋에는 **무엇을 했는지만** 써요. 작업 과정의 대화나 AI 도구 표시(`Co-Authored-By` 등)는 넣지 않아요.
- 작업을 시키면 이슈 생성부터 커밋, 푸시, PR 생성까지 이어서 해요.
- **머지와 릴리즈 PR은 사용자가 시켰을 때만** 해요. 사용자가 미리보기 주소로 화면을 확인한 뒤에 머지해요.
