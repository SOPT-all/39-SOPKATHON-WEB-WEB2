import { createBrowserRouter } from 'react-router';

import LoginPage from '@/pages/login/login-page';
import MatchingPage from '@/pages/matching/matching-page';
import MessagePage from '@/pages/message/message-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import OnboardingPage from '@/pages/onboarding/onboarding-page';
import OwnerApplyPage from '@/pages/owner-apply/owner-apply-page';
import OwnerPage from '@/pages/owner/owner-page';
import PlacePage from '@/pages/place/place-page';
import ProfilePage from '@/pages/profile/profile-page';
import RequestPage from '@/pages/request/request-page';
import MobileLayout from '@/shared/components/layout/mobile-layout';
import TabLayout from '@/shared/components/layout/tab-layout';
import { ROUTES } from '@/shared/constants/routes';

// 새 페이지는 ROUTES에 경로를 추가한 뒤 여기에 한 줄 넣으면 돼요.
// 하단 탭이 보여야 하는 페이지는 TabLayout 아래에 넣어요.
export const router = createBrowserRouter([
  { path: ROUTES.OWNER, element: <OwnerPage /> },
  { path: ROUTES.OWNER_APPLY, element: <OwnerApplyPage /> },
  {
    element: <MobileLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.ONBOARDING, element: <OnboardingPage /> },
      { path: ROUTES.MESSAGE, element: <MessagePage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      {
        element: <TabLayout />,
        children: [
          { path: ROUTES.MATCHING, element: <MatchingPage /> },
          { path: ROUTES.REQUEST, element: <RequestPage /> },
          { path: ROUTES.PLACE, element: <PlacePage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
