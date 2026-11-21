import type { ComponentProps } from 'react';

import ImgLogo from '@/shared/assets/images/img-logo.svg?react';
import { cn } from '@/shared/utils/cn';

const MatchingAppBar = ({ className, ...props }: ComponentProps<'header'>) => {
  return (
    <header
      className={cn(
        'flex h-12.5 w-full shrink-0 items-center px-7.75',
        className,
      )}
      {...props}
    >
      <ImgLogo role="img" aria-label="오작교" className="shrink-0" />
    </header>
  );
};

export default MatchingAppBar;
