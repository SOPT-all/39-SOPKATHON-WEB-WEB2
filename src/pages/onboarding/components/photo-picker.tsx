import { type ChangeEvent, useEffect, useMemo, useRef } from 'react';

import IcCamera from '@/shared/assets/icons/ic-camera.svg?react';
import IcClose from '@/shared/assets/icons/ic-close.svg?react';

interface PhotoPickerProps {
  photo: File | null;
  onChange: (photo: File | null) => void;
}

// 프로필 사진을 고르는 영역이에요. 비어 있으면 점선 상자, 고르면 사진과 지우기 버튼이 보여요.
const PhotoPicker = ({ photo, onChange }: PhotoPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo],
  );

  // 미리보기 주소는 다 쓰면 지워서 메모리를 돌려줘요.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null);
    // 같은 사진을 다시 골라도 change가 일어나게 비워 둬요.
    event.target.value = '';
  };

  return (
    <div className="relative h-42 w-full overflow-hidden rounded-[10px] border border-dashed border-grey-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="프로필 사진 선택"
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt="선택한 프로필 사진"
            className="size-full object-cover"
          />
          <button
            type="button"
            aria-label="사진 지우기"
            className="absolute top-4 right-3.5 flex size-6 items-center justify-center text-black"
            onClick={() => onChange(null)}
          >
            <IcClose aria-hidden="true" />
          </button>
        </>
      ) : (
        <button
          type="button"
          className="flex size-full flex-col items-center justify-center bg-grey-1 text-grey-4"
          onClick={() => inputRef.current?.click()}
        >
          <IcCamera aria-hidden="true" className="size-6" />
          <span className="text-title-sb-16">
            클릭하여 사진을 업로드 해주세요.
          </span>
        </button>
      )}
    </div>
  );
};

export default PhotoPicker;
