import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Message = ({
  children = '쪽지 내용입니다.',
  className,
  ...props
}: MessageProps) => {
  return (
    <div
      className={cn(
        'h-[105px] w-full rounded-[10px] bg-primary-10 px-5 py-4 text-title-m-16 text-black',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Message;
