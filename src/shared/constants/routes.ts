// 페이지 경로는 여기에 모아 두고, 문자열 대신 ROUTES.LOGIN처럼 써요.
// :targetId처럼 값이 들어가는 경로는 react-router의 generatePath로 만들어요.
//   generatePath(ROUTES.MESSAGE, { targetId: 3 })  →  /matching/3/message
export const ROUTES = {
  LOGIN: '/',
  ONBOARDING: '/onboarding',
  MATCHING: '/matching',
  MESSAGE: '/matching/:targetId/message',
  REQUEST: '/requests',
  PROFILE: '/requests/:requestId',
  PLACE: '/places',
  OWNER: '/owner',
  OWNER_APPLY: '/owner/apply',
} as const;
