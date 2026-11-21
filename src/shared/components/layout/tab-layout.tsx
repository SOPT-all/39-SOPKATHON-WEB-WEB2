import { Outlet } from 'react-router';

import NavigationBar from '@/shared/components/navigation-bar';

// 하단 내비게이션 바가 보이는 페이지를 감싸요.
// (매칭, 쪽지 작성, 받은 요청, 상세 프로필, 근처 장소)
//
// 내비게이션 바는 항상 화면 아래에 붙어 있고, 그 위의 영역만 스크롤돼요.
// 탭을 바꿔도 화면 폭과 내비게이션 바 위치가 움직이지 않아요.
const TabLayout = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 [scrollbar-width:none] flex-col overflow-y-auto">
        <Outlet />
      </div>
      <NavigationBar />
    </div>
  );
};

export default TabLayout;
