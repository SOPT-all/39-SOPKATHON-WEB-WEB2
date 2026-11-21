import { useId } from 'react';

import { cn } from '@/shared/utils/cn';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MessageInput = ({ value, onChange }: MessageInputProps) => {
  const id = useId();
  const count = Array.from(value).length;
  const hasError = count > 50;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          'flex h-37.25 flex-col justify-between rounded-[10px] border border-grey-4 bg-white p-5 focus-within:border-black',
          value && 'border-black',
        )}
      >
        <label htmlFor={id} className="sr-only">
          상대에게 보낼 쪽지
        </label>
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="쪽지 내용을 작성해주세요"
          aria-invalid={hasError}
          aria-describedby={`${id}-count${hasError ? ` ${id}-error` : ''}`}
          className="min-h-0 w-full flex-1 resize-none text-title-m-16 text-black outline-none placeholder:text-grey-4"
        />
        <p
          id={`${id}-count`}
          className="text-right text-title-m-16 text-grey-4"
        >
          ({count}/50)
        </p>
      </div>
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-text-m-14 text-error"
        >
          50자 이내로 작성해주세요.
        </p>
      )}
    </div>
  );
};

export default MessageInput;
