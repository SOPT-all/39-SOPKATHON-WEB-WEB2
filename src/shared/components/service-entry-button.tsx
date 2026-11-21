import type { ButtonHTMLAttributes } from 'react';

import IcArrowRight from '@/shared/assets/icons/ic-arrow-right.svg?react';
import { cn } from '@/shared/utils/cn';

type ServiceEntryButtonStatus = 'active' | 'disabled' | 'status3';

interface ServiceEntryButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> {
  showArrow?: boolean;
  status?: ServiceEntryButtonStatus;
}

const ServiceEntryButton = ({
  status = 'active',
  showArrow = false,
  className,
  children = '서비스 입장',
  ...props
}: ServiceEntryButtonProps) => {
  const isDisabled = status === 'disabled';
  const hasArrow = status === 'active' && showArrow;

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-[10px] px-15 py-4 text-title-sb-18 text-white',
        isDisabled ? 'bg-grey-2' : 'bg-primary-100',
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      <span>{children}</span>
      {hasArrow && <IcArrowRight className="size-6 shrink-0" />}
    </button>
  );
};

export default ServiceEntryButton;
