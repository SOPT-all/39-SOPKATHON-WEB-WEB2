import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import { postLogin } from '@/pages/login/api/post-login';
import ImgWordmark from '@/shared/assets/images/img-wordmark.svg?react';
import Input from '@/shared/components/input';
import LovebirdsAnimation from '@/shared/components/lovebirds-animation';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { ROUTES } from '@/shared/constants/routes';
import { setUserId } from '@/shared/utils/user-id';

const PHONE_NUMBER_LENGTH = 11;

// 숫자만 있는 번호를 010-1234-5678 모양으로 바꿔요. 넣는 중간에도 자리에 맞춰 하이픈이 들어가요.
const formatPhoneNumber = (digits: string) => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isValid = phoneNumber.length === PHONE_NUMBER_LENGTH;
  const canSubmit = isValid && !isSubmitting;

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 화면에는 하이픈을 넣어 보여 주지만, 값은 숫자만 남겨서 가지고 있어요.
    const digits = event.target.value.replace(/\D/g, '');

    setPhoneNumber(digits.slice(0, PHONE_NUMBER_LENGTH));
    setErrorMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { userId, onboarded } = await postLogin({ phoneNumber });

      // 저장해 두면 이후 모든 요청에 X-User-Id 헤더가 붙어요.
      setUserId(userId);
      // 온보딩을 마친 사람은 매칭으로, 처음인 사람은 온보딩으로 보내요.
      navigate(onboarded ? ROUTES.MATCHING : ROUTES.ONBOARDING);
    } catch {
      setErrorMessage('입장하지 못했어요. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
        {/* 버튼은 화면 아래에 고정이고, 그 위의 내용만 스크롤돼요. */}
        <div className="flex min-h-0 flex-1 [scrollbar-width:none] flex-col gap-12.5 overflow-y-auto pt-7.25">
          <section className="flex flex-col gap-9">
            <div className="flex flex-col gap-2.25 px-5">
              <p className="text-title-sb-18 text-grey-9">
                나이가 들어도 설렘은 그대로,
              </p>
              <h1>
                <ImgWordmark aria-label="오작교" role="img" />
              </h1>
            </div>
            <div className="relative aspect-375/164 w-full overflow-hidden">
              <LovebirdsAnimation className="absolute -top-[23.5%] -left-[4.5%] w-[115.1%]" />
            </div>
          </section>
          <div className="flex flex-col gap-2 px-5">
            <label
              htmlFor="phone-number"
              className="text-title-sb-16 text-grey-8"
            >
              전화번호
            </label>
            <Input
              id="phone-number"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="전화번호를 입력해주세요."
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneNumberChange}
            />
            {errorMessage && (
              <p role="alert" className="text-text-m-14 text-error">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0 px-5 pt-2 pb-5">
          <ServiceEntryButton
            type="submit"
            status={canSubmit ? 'active' : 'disabled'}
            showArrow
          />
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
