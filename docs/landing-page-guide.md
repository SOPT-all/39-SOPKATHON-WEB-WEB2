# 사장님용 랜딩페이지 작업 안내

동네 가게 사장님(30·40대)이 보는 랜딩페이지를 이 레포에 추가하는 방법이에요.
서버 API 없이 화면만 만들어요.

## 한눈에 보기

| 항목 | 내용 |
| --- | --- |
| 주소 | `/owner` (배포 후 `https://39-sopkathon-web-web2.vercel.app/owner`) |
| 페이지 위치 | `src/pages/owner` |
| 화면 틀 | 어르신용 앱의 폰 너비 틀 **밖**에 등록해요. 넓은 화면으로 보여요 |
| 서버 API | 없어요. 버튼을 눌러도 실제로 저장되지 않아요 |
| 고치는 기존 파일 | `routes.ts`, `router.tsx` 두 개뿐이에요 |

## 작업 순서

1. 이슈를 만들고 담당자를 지정해요. 브랜치가 자동으로 생겨요.
   - 제목: `[Feat] 사장님용 랜딩페이지 구현`
   - 브랜치 기능명: `owner-page`
2. 브랜치를 받아요.

   ```bash
   git fetch origin
   git checkout "feat/owner-page/#이슈번호"
   ```

3. 아래 "파일 위치"대로 파일을 만들어요.
4. `pnpm lint`, `pnpm format:check`, `pnpm build`가 통과하는지 확인해요.
5. `develop`으로 PR을 올려요. 제목은 `feat: 사장님용 랜딩페이지 구현`이에요.

## 파일 위치

```
src
├── pages
│   └── owner                   # 새로 만들어요
│       ├── owner-page.tsx      # 페이지 컴포넌트
│       └── components          # 이 페이지에서만 쓰는 컴포넌트
├── routes
│   └── router.tsx              # 한 줄 추가
└── shared
    ├── assets
    │   ├── icons               # ic-이름.svg
    │   └── images              # img-이름.png (랜딩페이지 이미지도 여기)
    └── constants
        └── routes.ts           # OWNER 경로 추가
```

- 이미지와 아이콘은 한 페이지에서만 써도 전부 `src/shared/assets`에 둬요.
- 화면이 여러 개면 `src/pages/owner-register`처럼 페이지마다 폴더를 따로 만들어요.

## 고칠 코드

### 1. 경로 추가 (`src/shared/constants/routes.ts`)

```ts
export const ROUTES = {
  LOGIN: '/',
  // ... 기존 경로
  OWNER: '/owner',
} as const;
```

### 2. 페이지 만들기 (`src/pages/owner/owner-page.tsx`)

```tsx
const OwnerPage = () => {
  return (
    <main className="min-h-dvh bg-white text-black">
      {/* 랜딩페이지 내용 */}
    </main>
  );
};

export default OwnerPage;
```

### 3. 라우터에 등록 (`src/routes/router.tsx`)

`MobileLayout` **바깥**에 넣어요. 안에 넣으면 폰 너비(최대 430px)로 좁아져요.

```tsx
import OwnerPage from '@/pages/owner/owner-page';

export const router = createBrowserRouter([
  { path: ROUTES.OWNER, element: <OwnerPage /> }, // 틀 밖: 넓은 화면
  {
    element: <MobileLayout />, // 틀 안: 어르신용 앱
    children: [
      // ... 기존 그대로
    ],
  },
]);
```

## 지킬 규칙

- 색상과 폰트는 `src/shared/styles/global.css`의 `@theme` 토큰만 써요. `#f8467b`, `text-[#333]`처럼 값을 직접 쓰지 않아요.
- 필요한 색이 없으면 `@theme`에 토큰을 추가하고 그걸 써요. 이름은 Figma의 변수 이름을 따라요.
- 이미지는 Figma에서 내려받은 것만 써요.
- 이미 있는 공통 컴포넌트(`src/shared/components`)를 먼저 찾아보고, 맞는 것이 있으면 그걸 써요.
- import는 `../` 대신 `@/` 절대 경로로 써요.

## 버튼 동작

서버가 없어서 "가게 등록하기" 같은 버튼은 실제로 저장되지 않아요. 디자인을 보고 둘 중 하나로 정해요.

- 눌러도 아무 일도 일어나지 않게 둬요.
- "신청이 접수됐어요" 같은 안내만 화면에 띄워요.

## 배포와 서버 관련 확인 결과

랜딩페이지 때문에 생기는 문제는 없어요.

| 항목 | 결과 |
| --- | --- |
| CORS | 해당 없어요. 랜딩페이지는 서버에 요청을 보내지 않아요 |
| HTTPS | Vercel이 자동으로 HTTPS로 배포해요 |
| `/owner` 주소로 직접 접속 | 열려요. `vercel.json`에 모든 주소를 앱으로 보내는 설정이 이미 있어요 |
| 배포 | `main`에 머지되면 어르신용 앱과 같이 배포돼요 |

### 참고: 어르신용 앱의 API 호출

랜딩페이지와는 상관없지만, API를 붙일 때 알아 두면 좋아요.

| 요청을 보내는 곳 | 서버 응답 |
| --- | --- |
| 배포 주소 `39-sopkathon-web-web2.vercel.app` | 허용 |
| 로컬 개발 `localhost:5173` | 허용 |
| PR 미리보기 주소 | 막힘 (403) |

- PR 미리보기에서는 화면 모양만 확인할 수 있고 API 호출은 실패해요. API 동작은 로컬이나 실제 배포 주소에서 확인해요.
- `X-User-Id` 헤더와 `POST`, `PATCH` 요청은 서버가 허용해요.
