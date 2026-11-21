import type { ButtonHTMLAttributes, ReactNode } from 'react';

import IcCall from '@/shared/assets/icons/ic-call.svg?react';
import { cn } from '@/shared/utils/cn';

type SmallButtonColor = 'pink' | 'gray';

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: SmallButtonColor;
  icon?: ReactNode;
  showIcon?: boolean;
}

const SmallButton = ({
  color = 'pink',
  icon,
  showIcon = true,
  className,
  children = '전화 걸기',
  ...props
}: SmallButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center gap-2 rounded-[10px] px-5 py-2 text-title-m-16 text-white',
        color === 'pink' ? 'bg-primary-100' : 'bg-grey-3',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showIcon && (icon ?? <IcCall className="size-4 shrink-0" />)}
    </button>
  );
};

export default SmallButton;
