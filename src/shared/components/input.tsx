import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface InputProps extends Omit<ComponentProps<'input'>, 'value'> {
  value: string;
  // true면 오른쪽에 (현재 글자 수/최대 글자 수)를 보여 줘요. maxLength와 같이 써요.
  showCount?: boolean;
}

// 한 줄 입력창이에요. 입력 중이거나 값이 있으면 테두리가 검정으로 바뀌어요.
//   <Input value={phone} onChange={handlePhoneChange} placeholder="전화번호를 입력해주세요." maxLength={11} showCount />
const Input = ({
  value,
  showCount = false,
  maxLength,
  className,
  ...props
}: InputProps) => {
  const hasCount = showCount && maxLength !== undefined;

  return (
    <label
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-[10px] border border-grey-3 bg-white px-4.5 py-4',
        'focus-within:border-black',
        value.length > 0 && 'border-black',
        className,
      )}
    >
      <input
        value={value}
        maxLength={maxLength}
        className="min-w-0 flex-1 text-title-m-16 text-black outline-none placeholder:text-grey-4"
        {...props}
      />
      {hasCount && (
        <span className="shrink-0 text-title-m-16 text-grey-4">
          ({value.length}/{maxLength})
        </span>
      )}
    </label>
  );
};

export default Input;
