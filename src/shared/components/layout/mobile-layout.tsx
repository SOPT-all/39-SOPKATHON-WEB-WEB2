import { Outlet } from 'react-router';

import StatusBar from '@/shared/components/status-bar';

// 모든 페이지를 감싸는 모바일 화면 틀이에요.
// - 휴대폰에서는 화면을 꽉 채워요.
// - 넓은 화면(PC)에서는 Figma와 같은 375×667 크기로 가운데에 보여요.
//
// 틀의 높이는 고정이에요. 문서 전체가 스크롤되지 않고, 틀 안쪽만 스크롤돼요.
// - 페이지의 가장 바깥 요소에 flex-1을 주면 남은 높이를 다 채워요.
// - 내용이 길면 페이지 전체가 틀 안에서 스크롤돼요.
// - 일부만 스크롤하려면 바깥 요소에 min-h-0을 주고, 스크롤할 요소에 overflow-y-auto를 줘요.
// - fixed로 띄운 요소(바텀시트, 모달)는 화면이 아니라 이 틀을 기준으로 놓여요.
const MobileLayout = () => {
  return (
    <div className="flex h-dvh items-center justify-center bg-grey-1">
      <div className="flex h-full w-full [transform:translateZ(0)] flex-col overflow-hidden bg-white safe-area text-black sm:max-h-166.75 sm:max-w-93.75">
        <StatusBar />
        <div className="flex min-h-0 flex-1 [scrollbar-width:none] flex-col overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
