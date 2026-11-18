import { createBrowserRouter } from 'react-router';

import HomePage from '@/pages/home/home-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import { ROUTES } from '@/shared/constants/routes';

// 새 페이지는 ROUTES에 경로를 추가한 뒤 여기에 한 줄 넣으면 돼요.
export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: '*', element: <NotFoundPage /> },
]);
