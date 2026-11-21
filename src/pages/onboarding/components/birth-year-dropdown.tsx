import IcArrowDown from '@/shared/assets/icons/ic-arrow-down.svg?react';
import IcArrowUp from '@/shared/assets/icons/ic-arrow-up.svg?react';
import { cn } from '@/shared/utils/cn';

interface BirthYearDropdownProps {
  id?: string;
  value: number | null;
  isOpen: boolean;
  onClick: () => void;
}

// 태어난 년도를 보여 주는 칸이에요. 누르면 년도를 고르는 바텀시트가 열려요.
const BirthYearDropdown = ({
  id,
  value,
  isOpen,
  onClick,
}: BirthYearDropdownProps) => {
  const Icon = isOpen ? IcArrowUp : IcArrowDown;

  return (
    <button
      id={id}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between rounded-[10px] border border-grey-5 bg-white px-4.5 py-4"
      onClick={onClick}
    >
      <span
        className={cn(
          'text-title-m-16',
          value === null ? 'text-grey-4' : 'text-grey-10',
        )}
      >
        {value ?? '태어난 년도를 등록해주세요'}
      </span>
      <Icon aria-hidden="true" className="size-6 text-black" />
    </button>
  );
};

export default BirthYearDropdown;
