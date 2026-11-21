import OwnerHeader from '@/pages/owner/components/owner-header';
import PhoneMockup from '@/pages/owner/components/phone-mockup';
import PhonePreview from '@/pages/owner/components/phone-preview';
import ownerQr from '@/shared/assets/images/img-owner-qr.png';

const DAJEONG_CAFE_IMAGE =
  'https://spokerthon-39.s3.ap-northeast-2.amazonaws.com/dummy/places/cafe_12.png';

const STEPS = [
  {
    badge: '01 · 마음 전하기',
    title: '마음에 드는 분께\n쪽지를 건네요',
    description: '가까이 사는 분들의 사진과 나이, 거리를 볼 수 있어요',
    point: '쪽지를 보내면 내 번호가 함께 전해져요',
    type: 'message' as const,
  },
  {
    badge: '02 · 전화하기',
    title: '목소리로 먼저\n알아가요',
    description:
      '받은 요청에서 쪽지를 보낸 분을 확인해요. 마음이 가면 전화 걸기를 눌러보세요',
    point: '채팅 대신 익숙한 전화로 이야기해요',
    type: 'requests' as const,
  },
  {
    badge: '03 · 만나기',
    title: '첫 데이트는\n가까운 찻집에서',
    description:
      '통화가 잘 맞았다면 두 분이 함께 가기 좋은 찻집과 카페를 살펴보세요',
    point: '장소 카드에서 가게별 방문 혜택을 확인할 수 있어요',
    type: 'places' as const,
  },
] as const;

const FAQS = [
  [
    '누가 이용할 수 있나요?',
    '오작교는 새로운 인연을 찾는 65세 이상 어르신을 위한 서비스예요',
  ],
  [
    '컴퓨터에서도 사람을 만날 수 있나요?',
    '휴대폰 카메라로 소개 페이지의 QR을 찍으면 모바일에서 시작할 수 있어요',
  ],
  [
    '번호는 어떻게 전달하나요?',
    '쪽지를 보내면 내 번호가 함께 전해지고, 받은 분이 전화 걸기를 누르면 통화할 수 있어요',
  ],
  [
    '내 번호가 아무에게나 보이나요?',
    '내 번호는 내가 쪽지를 보낸 분께만 전해져요. 사는 동네는 보이지 않고 거리만 보여요',
  ],
] as const;

const OwnerPage = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto min-h-dvh max-w-[1440px] overflow-hidden bg-white text-black md:[zoom:0.8]">
      <div className="bg-gradient-to-b from-primary-10 to-white">
        <OwnerHeader />
        <section className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 pt-8 pb-16 md:flex-row md:items-center md:justify-between md:px-10 md:pt-16 xl:px-0">
          <div className="flex flex-col items-start gap-[18px] md:gap-9">
            <span className="rounded-full bg-primary-100 px-3 py-1.5 text-[13px] font-semibold text-white md:text-[15px]">
              65세 이상을 위한 인연 찾기
            </span>
            <h1 className="text-[34px] leading-[1.3] font-bold md:text-6xl md:leading-[1.2]">
              인생 2막,
              <br />
              설레는 인연을 만나요
            </h1>
            <p className="text-[17px] leading-[1.5] font-medium text-grey-5 md:text-xl">
              가까이 사는 분께 쪽지와 번호를 건네고,
              <br />
              전화로 천천히 알아가보세요.
            </p>
          </div>
          <div className="relative mx-auto h-[430px] w-[335px] md:mx-0 md:h-[560px] md:w-[500px]">
            <PhoneMockup
              large
              className="motion-float absolute top-0 left-[52px] md:left-[170px]"
            >
              <PhonePreview large type="matching" />
            </PhoneMockup>
            <div className="motion-float-delayed absolute top-[356px] left-0 z-10 rounded-2xl bg-white px-4 py-3 shadow-lg md:top-[430px]">
              <b>김영수님이 쪽지를 보냈어요</b>
              <p className="text-sm text-grey-5">“같이 산책하실래요?”</p>
            </div>
            <div className="motion-heart absolute top-14 right-5 flex size-11 items-center justify-center rounded-full bg-primary-100 text-xl text-white md:right-0 md:size-14">
              ♥
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-5 py-10 md:gap-32 md:px-10 md:py-28 xl:px-0">
        <section data-reveal>
          <h2 className="mb-7 text-2xl font-bold md:text-[32px]">
            인연은 이렇게 이어져요
          </h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              [
                '프로필 둘러보기',
                '가까이 사는 분의 사진과 나이, 거리를 살펴봐요',
              ],
              ['쪽지와 번호 건네기', '마음에 드는 분께 짧은 쪽지를 보내요'],
              ['전화하고 만나기', '통화가 잘 맞으면 가까운 곳에서 만나요'],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-[20px] border border-grey-2 px-7 py-6"
              >
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 text-grey-5">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          data-reveal
          className="grid gap-5 rounded-[20px] bg-primary-10 px-6 py-8 md:grid-cols-2 md:items-center md:px-10 md:py-20"
        >
          <div>
            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold">
              오작교가 시작된 이유
            </span>
            <h2 className="mt-4 text-[26px] leading-[1.35] font-bold md:text-[44px]">
              나이가 들어도
              <br />
              설렘은 그대로니까요
            </h2>
          </div>
          <div>
            <p className="text-[17px] font-bold md:text-[22px]">
              새로운 인연을 만나고 싶어도
              <br />
              먼저 말을 건네기는 쉽지 않아요
            </p>
            <p className="mt-5 text-[15px] font-medium text-grey-5 md:text-xl">
              오작교는 65세 이상 어르신이 쪽지와 번호를 건네고, 전화로 이야기
              나눈 뒤 가까운 곳에서 만나도록 이어드려요
            </p>
          </div>
        </section>

        <section data-reveal>
          <div className="mb-12 text-center">
            <span className="rounded-full bg-primary-100 px-3 py-1.5 text-sm font-semibold text-white">
              이용 안내
            </span>
            <h2 className="mt-4 text-[26px] font-bold md:text-[44px]">
              세 단계로 이어지는 첫 만남
            </h2>
          </div>
          <div className="flex flex-col gap-14 md:gap-28">
            {STEPS.map((step, index) => (
              <article
                key={step.badge}
                data-reveal
                className="grid items-center gap-8 md:grid-cols-2"
              >
                <div className={index % 2 ? 'md:order-2' : ''}>
                  <span className="rounded-full bg-primary-100 px-3 py-1.5 text-sm font-semibold text-white">
                    {step.badge}
                  </span>
                  <h3 className="mt-4 text-[26px] leading-[1.35] font-bold whitespace-pre-line md:text-[44px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-medium text-grey-5 md:text-xl">
                    {step.description}
                  </p>
                  <p className="mt-3 font-medium md:text-xl">{step.point}</p>
                </div>
                <div
                  className={`flex justify-center ${index % 2 ? 'md:order-1' : ''}`}
                >
                  <PhoneMockup>
                    <PhonePreview type={step.type} />
                  </PhoneMockup>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          data-reveal
          className="grid gap-8 rounded-[20px] bg-grey-1 px-5 py-7 md:grid-cols-2 md:items-center md:px-10 md:py-14"
        >
          <div>
            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold">
              데이트 장소
            </span>
            <h2 className="mt-4 text-2xl font-bold md:text-[44px]">
              두 분이 함께 갈 곳을
              <br />
              찾아보세요
            </h2>
            <p className="mt-4 text-grey-5 md:text-xl">
              가게 사진과 위치, 받을 수 있는 혜택을 한눈에 볼 수 있어요
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white">
            <div className="flex gap-4 p-5">
              <img
                src={DAJEONG_CAFE_IMAGE}
                alt="다정카페 내부"
                className="h-[86px] w-[104px] shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="text-[22px] font-bold">다정카페</h3>
                <p className="text-grey-5">동대문구 제기로 12 · 0.4km</p>
                <p className="text-primary-100">지도 보기 ↗</p>
              </div>
            </div>
            <div className="flex gap-3 bg-grey-6 p-5 text-white">
              <b>제휴 혜택</b>
              <span>두 분 방문 시 음료 10% 할인</span>
            </div>
          </div>
        </section>

        <section data-reveal className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div>
            <span className="rounded-full bg-primary-100 px-3 py-1.5 text-sm font-semibold text-white">
              이용 안내
            </span>
            <h2 className="mt-4 text-[26px] font-bold md:text-[44px]">
              자주 묻는 질문
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(([q, a]) => (
              <article
                key={q}
                className="rounded-[20px] border border-grey-2 p-5 md:px-7"
              >
                <h3 className="text-lg font-bold md:text-[22px]">{q}</h3>
                <p className="mt-2 text-[15px] text-grey-5">{a}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-[20px] bg-black px-6 py-8 text-white md:flex-row md:items-center md:px-10 md:py-14"
        >
          <div>
            <h2 className="text-2xl font-bold md:text-[44px]">
              휴대폰으로 오작교 시작하기
            </h2>
            <p className="mt-3 md:text-xl">
              휴대폰 카메라로 QR을 찍어 모바일 화면을 열어보세요.
            </p>
          </div>
          <div className="size-28 rounded-xl bg-white p-1">
            <img
              src={ownerQr}
              alt="휴대폰에서 오작교를 여는 QR 코드"
              className="size-full object-contain"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default OwnerPage;
import { useEffect } from 'react';
