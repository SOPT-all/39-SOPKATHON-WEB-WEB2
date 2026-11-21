import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import IcCall from '@/shared/assets/icons/ic-call.svg?react';
import { cn } from '@/shared/utils/cn';

type SmallButtonColor = 'pink' | 'gray';

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: SmallButtonColor;
  href?: string;
  icon?: ReactNode;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  showIcon?: boolean;
}

const SmallButton = ({
  color = 'pink',
  href,
  icon,
  onLinkClick,
  showIcon = true,
  className,
  children = '전화 걸기',
  ...props
}: SmallButtonProps) => {
  const buttonClassName = cn(
    'flex items-center justify-center gap-2 rounded-[10px] px-5 py-2 text-title-m-16 text-white',
    color === 'pink' ? 'bg-primary-100' : 'bg-grey-3',
    className,
  );

  if (href) {
    return (
      <a href={href} className={buttonClassName} onClick={onLinkClick}>
        <span>{children}</span>
        {showIcon && (icon ?? <IcCall className="size-4 shrink-0" />)}
      </a>
    );
  }

  return (
    <button type="button" className={buttonClassName} {...props}>
      <span>{children}</span>
      {showIcon && (icon ?? <IcCall className="size-4 shrink-0" />)}
    </button>
  );
};

export default SmallButton;
