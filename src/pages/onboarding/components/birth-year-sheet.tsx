import { type UIEvent, useEffect, useRef, useState } from 'react';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { cn } from '@/shared/utils/cn';

interface BirthYearSheetProps {
  initialYear: number | null;
  onClose: () => void;
  onSubmit: (year: number) => void;
}

// 1900년부터 올해까지 모두 고를 수 있어요.
const FIRST_YEAR = 1900;
const LAST_YEAR = new Date().getFullYear();
const DEFAULT_YEAR = 1960;
const YEARS = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, index) => FIRST_YEAR + index,
);

// 한 줄 높이(43px)에 줄 사이 간격(4px)을 더한 값이에요. 아래 클래스의 h-10.75, gap-1과 맞춰요.
const ROW_PITCH = 47;
// 휠을 연달아 굴릴 때 한 칸씩 넘어가는 최소 간격이에요.
const WHEEL_STEP_MS = 70;
const WHEEL_IDLE_MS = 300;
const VIBRATE_MS = 8;

const clampIndex = (index: number) =>
  Math.min(Math.max(index, 0), YEARS.length - 1);

// 태어난 년도를 고르는 바텀시트예요.
// 가운데 회색 칸은 고정되어 있고, 목록을 굴려서 가운데에 온 년도가 선택돼요.
const BirthYearSheet = ({
  initialYear,
  onClose,
  onSubmit,
}: BirthYearSheetProps) => {
  const [selectedYear, setSelectedYear] = useState(initialYear ?? DEFAULT_YEAR);
  const listRef = useRef<HTMLUListElement>(null);

  // 열릴 때 고른 년도가 가운데 칸에 오게 해요.
  useEffect(() => {
    const index = (initialYear ?? DEFAULT_YEAR) - FIRST_YEAR;

    listRef.current?.scrollTo({ top: index * ROW_PITCH });
  }, [initialYear]);

  // 마우스 휠은 한 번 굴릴 때마다 정확히 한 칸씩 움직여요.
  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    let targetIndex = 0;
    let lastWheelAt = 0;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const now = Date.now();

      if (now - lastWheelAt < WHEEL_STEP_MS) return;

      // 한동안 쉬었다가 다시 굴리면 지금 위치에서 시작해요.
      if (now - lastWheelAt > WHEEL_IDLE_MS) {
        targetIndex = Math.round(list.scrollTop / ROW_PITCH);
      }

      lastWheelAt = now;
      targetIndex = clampIndex(targetIndex + Math.sign(event.deltaY));
      list.scrollTo({ top: targetIndex * ROW_PITCH, behavior: 'smooth' });
    };

    list.addEventListener('wheel', handleWheel, { passive: false });

    return () => list.removeEventListener('wheel', handleWheel);
  }, []);

  // 굴릴 때마다 가운데에 가장 가까운 년도를 선택해요.
  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    const index = Math.round(event.currentTarget.scrollTop / ROW_PITCH);
    const year = YEARS[clampIndex(index)];

    if (year === selectedYear) return;

    setSelectedYear(year);
    // 진동을 지원하는 휴대폰에서는 년도가 바뀔 때마다 짧게 울려요.
    navigator.vibrate?.(VIBRATE_MS);
  };

  // 년도를 누르면 그 년도가 가운데로 굴러와요.
  const handleYearClick = (year: number) => {
    listRef.current?.scrollTo({
      top: (year - FIRST_YEAR) * ROW_PITCH,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed inset-0 z-20 mx-auto flex w-full max-w-107.5 flex-col justify-end">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-black-80"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="birth-year-sheet-title"
        className="relative flex flex-col gap-4 rounded-t-[20px] bg-white p-5"
      >
        <header className="flex items-center justify-between">
          <h2 id="birth-year-sheet-title" className="text-title-sb-18">
            태어난 년도 등록
          </h2>
          <button
            type="button"
            aria-label="닫기"
            className="flex size-6 items-center justify-center text-black"
            onClick={onClose}
          >
            <IcClose aria-hidden="true" />
          </button>
        </header>
        <div className="relative h-57.75">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-23.5 h-10.75 rounded-[10px] bg-grey-1"
          />
          <ul
            ref={listRef}
            className="relative flex h-full snap-y snap-mandatory [scrollbar-width:none] flex-col gap-1 overflow-y-auto py-23.5"
            onScroll={handleScroll}
          >
            {YEARS.map((year) => {
              const isSelected = year === selectedYear;

              return (
                <li key={year} className="shrink-0 snap-center">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    className={cn(
                      'h-10.75 w-full text-center transition-[scale,color] duration-150 ease-out',
                      isSelected
                        ? 'scale-115 text-title-sb-18 text-black'
                        : 'text-title-m-18 text-grey-2',
                    )}
                    onClick={() => handleYearClick(year)}
                  >
                    {year}년
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <ServiceEntryButton onClick={() => onSubmit(selectedYear)}>
          등록하기
        </ServiceEntryButton>
      </section>
    </div>
  );
};

export default BirthYearSheet;
