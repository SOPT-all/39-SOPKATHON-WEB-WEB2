import type { Gender } from '@/pages/onboarding/types';
import { cn } from '@/shared/utils/cn';

interface GenderSelectProps {
  value: Gender | null;
  onChange: (gender: Gender) => void;
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'FEMALE', label: '여성' },
  { value: 'MALE', label: '남성' },
];

// 성별을 고르는 버튼 두 개예요. 고른 쪽이 분홍색으로 바뀌어요.
const GenderSelect = ({ value, onChange }: GenderSelectProps) => {
  return (
    <div role="radiogroup" aria-label="성별" className="flex w-full gap-2">
      {GENDER_OPTIONS.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={cn(
              'flex-1 rounded-[10px] border py-3 text-title-sb-18',
              isSelected
                ? 'border-primary-100 bg-primary-10 text-primary-100'
                : 'border-grey-4 bg-white text-grey-4',
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default GenderSelect;
