import { Outlet } from 'react-router';

// 하단 탭이 보이는 페이지(매칭, 받은 요청, 근처 장소)를 감싸요.
const TabLayout = () => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      {/* 하단 내비게이션 바가 여기에 들어가요. */}
    </>
  );
};

export default TabLayout;
