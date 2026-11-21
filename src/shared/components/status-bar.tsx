// Figma의 상단 54px 영역만 유지해요. 시간과 배터리는 실제 기기가 표시해요.
const StatusBar = () => {
  return <div aria-hidden="true" className="h-status-bar w-full shrink-0" />;
};

export default StatusBar;
