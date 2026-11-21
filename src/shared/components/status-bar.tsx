// Figma 화면 맨 위의 54px은 휴대폰의 상태 바(시간, 배터리)가 차지하는 자리예요.
// - 넓은 화면(PC의 375×667 틀)에서는 그 자리를 비워 둬서 Figma와 같은 위치에 내용이 놓여요.
// - 실제 휴대폰에서는 기기가 이미 그 자리를 차지하고 있어서 비우지 않아요.
const StatusBar = () => {
  return (
    <div
      aria-hidden="true"
      className="hidden h-status-bar w-full shrink-0 sm:block"
    />
  );
};

export default StatusBar;
