import { Outlet } from 'react-router';

import StatusBar from '@/shared/components/status-bar';

// 모든 페이지를 감싸는 모바일 화면 틀이에요.
// 넓은 화면에서는 가운데에 폰 너비(최대 430px)로 보여요.
// 페이지의 가장 바깥 요소에 flex-1을 주면 남은 높이를 다 채워요.
const MobileLayout = () => {
  return (
    <div className="min-h-dvh bg-grey-1">
      <div className="mx-auto flex min-h-dvh w-full max-w-107.5 flex-col bg-white safe-area text-black">
        <StatusBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MobileLayout;
