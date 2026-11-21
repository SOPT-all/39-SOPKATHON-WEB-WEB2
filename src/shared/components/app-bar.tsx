import type { ComponentProps } from 'react';

import IcArrowLeft from '@/shared/assets/icons/ic-arrow-left.svg?react';
import { cn } from '@/shared/utils/cn';

interface AppBarProps extends ComponentProps<'header'> {
  title: string;
  onBack: () => void;
}

const AppBar = ({ title, onBack, className, ...props }: AppBarProps) => {
  return (
    <header
      className={cn(
        'grid w-full shrink-0 grid-cols-[24px_minmax(0,1fr)_24px] items-center px-5 py-2.75',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="flex size-6 items-center justify-center text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <IcArrowLeft aria-hidden="true" />
      </button>
      <h1 className="truncate text-center text-title-sb-18 text-grey-9">
        {title}
      </h1>
      <span aria-hidden="true" className="size-6" />
    </header>
  );
};

export default AppBar;
