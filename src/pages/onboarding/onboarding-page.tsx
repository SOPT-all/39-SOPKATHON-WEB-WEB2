import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import BirthYearDropdown from '@/pages/onboarding/components/birth-year-dropdown';
import BirthYearSheet from '@/pages/onboarding/components/birth-year-sheet';
import GenderSelect from '@/pages/onboarding/components/gender-select';
import PhotoPicker from '@/pages/onboarding/components/photo-picker';
import type { Gender } from '@/pages/onboarding/types';
import Input from '@/shared/components/input';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { ROUTES } from '@/shared/constants/routes';

const NICKNAME_MAX_LENGTH = 10;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isValid =
    photo !== null &&
    nickname.trim().length > 0 &&
    gender !== null &&
    birthYear !== null;

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value.slice(0, NICKNAME_MAX_LENGTH));
  };

  const handleBirthYearSubmit = (year: number) => {
    setBirthYear(year);
    setIsSheetOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) return;

    navigate(ROUTES.MATCHING);
  };

  return (
    <main className="flex flex-1 flex-col pt-2.75 pb-5">
      <h1 className="sr-only">내 정보 등록</h1>
      <form
        className="flex flex-1 flex-col justify-between gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10">
          <PhotoPicker photo={photo} onChange={setPhoto} />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nickname"
                className="text-title-sb-16 text-grey-8"
              >
                이름/닉네임
              </label>
              <Input
                id="nickname"
                placeholder="이름이나 닉네임을 입력해주세요."
                value={nickname}
                maxLength={NICKNAME_MAX_LENGTH}
                showCount
                onChange={handleNicknameChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-title-sb-16 text-grey-8">성별</p>
              <GenderSelect value={gender} onChange={setGender} />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="birth-year"
                className="text-title-sb-16 text-grey-8"
              >
                태어난 년도
              </label>
              <BirthYearDropdown
                id="birth-year"
                value={birthYear}
                isOpen={isSheetOpen}
                onClick={() => setIsSheetOpen(true)}
              />
            </div>
          </div>
        </div>
        <ServiceEntryButton
          type="submit"
          status={isValid ? 'active' : 'disabled'}
        >
          시작하기
        </ServiceEntryButton>
      </form>
      {isSheetOpen && (
        <BirthYearSheet
          initialYear={birthYear}
          onClose={() => setIsSheetOpen(false)}
          onSubmit={handleBirthYearSubmit}
        />
      )}
    </main>
  );
};

export default OnboardingPage;
