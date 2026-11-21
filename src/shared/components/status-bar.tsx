import IcStatusBattery from '@/shared/assets/icons/ic-status-battery.svg?react';
import IcStatusSignal from '@/shared/assets/icons/ic-status-signal.svg?react';
import IcStatusWifi from '@/shared/assets/icons/ic-status-wifi.svg?react';

// 기기 상태를 읽는 UI가 아니라 Figma의 54px 상태바를 재현하는 장식 영역이에요.
const StatusBar = () => {
  return (
    <div
      aria-hidden="true"
      className="h-status-bar w-full shrink-0 px-0.75 py-1"
    >
      <div className="relative h-[45.76px] w-full">
        <span className="absolute top-[24.06px] left-[49.92px] w-[43.68px] -translate-1/2 text-center text-status-bar-time text-black">
          9:41
        </span>
        <IcStatusSignal className="absolute top-[18.72px] right-[66.56px]" />
        <IcStatusWifi className="absolute top-[17.68px] right-[45.48px]" />
        <IcStatusBattery className="absolute top-[17.68px] right-[15.26px]" />
      </div>
    </div>
  );
};

export default StatusBar;
