import { Outlet } from 'react-router';

import NavigationBar from '@/shared/components/navigation-bar';

// 하단 탭이 보이는 페이지(매칭, 받은 요청, 근처 장소)를 감싸요.
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
