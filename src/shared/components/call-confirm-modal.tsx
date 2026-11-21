import type { HTMLAttributes } from 'react';

import IcCallLarge from '@/shared/assets/icons/ic-call-large.svg?react';
import { cn } from '@/shared/utils/cn';

interface CallConfirmModalProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  onConfirm?: () => void;
  onReject?: () => void;
  title?: string;
}

const CallConfirmModal = ({
  onConfirm,
  onReject,
  isLoading = false,
  title = '통화를 하셨나요?',
  className,
  ...props
}: CallConfirmModalProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-confirm-modal-title"
      className={cn(
        'flex w-full max-w-[330px] flex-col items-center gap-[17px] rounded-[20px] bg-white p-[18px]',
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col items-center gap-2.5">
        <IcCallLarge className="size-[86px] text-grey-4" />
        <h2
          id="call-confirm-modal-title"
          className="text-center text-title-b-20 text-black"
        >
          {title}
        </h2>
      </div>
      <div className="flex w-full gap-2">
        <button
          type="button"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-grey-6 px-5 py-2.5 text-title-m-18 text-grey-1"
          onClick={onReject}
        >
          아니요
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-primary-100 px-5 py-2.5 text-title-m-18 text-white"
          onClick={onConfirm}
        >
          {isLoading ? '처리 중...' : '네, 했어요'}
        </button>
      </div>
    </div>
  );
};

export default CallConfirmModal;
