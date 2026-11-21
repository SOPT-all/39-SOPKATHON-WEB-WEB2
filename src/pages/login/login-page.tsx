import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import ImgWordmark from '@/shared/assets/images/img-wordmark.svg?react';
import Input from '@/shared/components/input';
import LovebirdsAnimation from '@/shared/components/lovebirds-animation';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { ROUTES } from '@/shared/constants/routes';

const PHONE_NUMBER_LENGTH = 11;

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  const isValid = phoneNumber.length === PHONE_NUMBER_LENGTH;

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 숫자만 남겨요. 하이픈을 넣어도 지워져요.
    const digits = event.target.value.replace(/\D/g, '');

    setPhoneNumber(digits.slice(0, PHONE_NUMBER_LENGTH));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) return;

    navigate(ROUTES.ONBOARDING);
  };

  return (
    <main className="flex flex-1 flex-col gap-12.5 pt-7.25 pb-5">
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
      <form
        className="flex flex-1 flex-col justify-between gap-15 px-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
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
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <ServiceEntryButton
          type="submit"
          status={isValid ? 'active' : 'disabled'}
          showArrow
        />
      </form>
    </main>
  );
};

export default LoginPage;
