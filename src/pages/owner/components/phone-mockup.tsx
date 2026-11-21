import type { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  large?: boolean;
}

const PhoneMockup = ({
  children,
  className,
  large = false,
}: PhoneMockupProps) => {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden bg-grey-10 p-[7px] shadow-[0_18px_36px_rgb(110_26_56_/_0.18)] md:shadow-[0_24px_48px_rgb(110_26_56_/_0.18)]',
        large
          ? 'h-[430px] w-[247px] rounded-[32px] md:h-[560px] md:w-[320px] md:rounded-[40px]'
          : 'h-[400px] w-[230px] rounded-[30px] md:h-[434px] md:w-[250px] md:rounded-[33px]',
        className,
      )}
    >
      <div className="h-full overflow-hidden rounded-[24px] bg-white md:rounded-[27px]">
        {children}
      </div>
    </div>
  );
};

export default PhoneMockup;
