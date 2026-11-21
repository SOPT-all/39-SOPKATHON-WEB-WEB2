import type { ComponentProps, ReactNode } from 'react';

import IcRequest from '@/shared/assets/icons/ic-request-default.svg?react';
import { cn } from '@/shared/utils/cn';

type ButtonProps = Omit<ComponentProps<'button'>, 'color'> & {
  color?: 'gray60' | 'gray30' | 'white' | 'pink';
  icon?: ReactNode;
  children: ReactNode;
};

const COLOR_CLASSES = {
  gray60: 'bg-grey-6 text-grey-1',
  gray30: 'bg-grey-3 text-grey-1',
  white: 'bg-white text-grey-10',
  pink: 'bg-primary-100 text-white',
};

const Button = ({
  color = 'gray60',
  icon = <IcRequest />,
  children,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11.75 w-35 shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-lg px-5 py-2.5 text-title-m-18 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed',
        COLOR_CLASSES[color],
        className,
      )}
      {...props}
    >
      {icon && (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
