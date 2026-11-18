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

## Git 워크플로우

- `main`: 배포 브랜치, `develop`: 통합 브랜치(기본 브랜치). **둘 다 직접 push 금지.**
- 순서: **이슈 생성 → `develop`에서 브랜치 생성 → 커밋 → `develop`으로 PR → 머지**
- `main`에는 `develop`에서 올리는 릴리즈 PR로만 반영해요. `main`에 머지되면 자동으로 배포돼요.
- PR을 열면 미리보기 주소가 댓글로 달려요.
- 리뷰는 충돌이 없으면 생략하고 본인이 머지해요.

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
| `style` | 스타일만 바꿀 때 |
| `chore` | 설정, 패키지 등 기타 |
| `docs` | README 같은 문서 |

### 이슈 · PR 작성

- 이슈와 PR은 `.github`의 템플릿 형식을 따라요.
- 이슈와 PR에 타입 라벨과 담당자 이름 라벨을 붙이고, 담당자(Assignees)를 지정해요.
- PR 본문에 `close #이슈번호`를 넣어 머지될 때 이슈가 닫히게 해요.
- 이슈, PR, 커밋에는 **무엇을 했는지만** 써요. 작업 과정의 대화나 AI 도구 표시(`Co-Authored-By` 등)는 넣지 않아요.
- 커밋, 푸시, PR 생성, 머지는 **사용자가 시켰을 때만** 해요.
