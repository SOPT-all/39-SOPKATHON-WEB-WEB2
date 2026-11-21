import { useEffect, useRef, useState } from 'react';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { cn } from '@/shared/utils/cn';

interface BirthYearSheetProps {
  initialYear: number | null;
  onClose: () => void;
  onSubmit: (year: number) => void;
}

const FIRST_YEAR = 1930;
const LAST_YEAR = 1980;
const DEFAULT_YEAR = 1960;
const YEARS = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, index) => FIRST_YEAR + index,
);

// 태어난 년도를 고르는 바텀시트예요. 년도를 누르고 "등록하기"를 누르면 값이 정해져요.
const BirthYearSheet = ({
  initialYear,
  onClose,
  onSubmit,
}: BirthYearSheetProps) => {
  const [selectedYear, setSelectedYear] = useState(initialYear ?? DEFAULT_YEAR);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // 열릴 때 고른 년도가 목록 가운데에 오게 해요.
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'center' });
  }, []);

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
        <ul className="flex h-57.75 [scrollbar-width:none] flex-col gap-1 overflow-y-auto">
          {YEARS.map((year) => {
            const isSelected = year === selectedYear;

            return (
              <li key={year}>
                <button
                  ref={isSelected ? selectedRef : undefined}
                  type="button"
                  aria-pressed={isSelected}
                  className={cn(
                    'w-full rounded-[10px] px-5 py-2 text-center',
                    isSelected
                      ? 'bg-grey-1 text-title-sb-18 text-black'
                      : 'text-title-m-18 text-grey-2',
                  )}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}년
                </button>
              </li>
            );
          })}
        </ul>
        <ServiceEntryButton onClick={() => onSubmit(selectedYear)}>
          등록하기
        </ServiceEntryButton>
      </section>
    </div>
  );
};

export default BirthYearSheet;
