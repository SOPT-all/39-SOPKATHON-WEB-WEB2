import { Outlet } from 'react-router';

import NavigationBar from '@/shared/components/navigation-bar';

// 하단 내비게이션 바가 보이는 페이지를 감싸요.
// (매칭, 쪽지 작성, 받은 요청, 상세 프로필, 근처 장소)
const TabLayout = () => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <NavigationBar />
    </>
  );
};

export default TabLayout;
