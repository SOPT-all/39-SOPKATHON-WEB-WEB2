import IcArrowRight from '@/shared/assets/icons/ic-arrow-right.svg?react';
import IcCall from '@/shared/assets/icons/ic-call.svg?react';
import IcCompassActive from '@/shared/assets/icons/ic-compass-active.svg?react';
import IcCompassDefault from '@/shared/assets/icons/ic-compass-default.svg?react';
import IcHeartActive from '@/shared/assets/icons/ic-heart-active.svg?react';
import IcHeartDefault from '@/shared/assets/icons/ic-heart-default.svg?react';
import IcRequestActive from '@/shared/assets/icons/ic-request-active.svg?react';
import IcRequestDefault from '@/shared/assets/icons/ic-request-default.svg?react';
import profileWoman1 from '@/shared/assets/images/img-owner-profile-woman-1.png';
import profileWoman2 from '@/shared/assets/images/img-owner-profile-woman-2.png';
import logo from '@/shared/assets/images/logo.png';
import matchingImage from '@/shared/assets/images/matching_image.png';

const PLACE_IMAGES = [
  {
    name: '핵밥 건대본점',
    src: 'https://spokerthon-39.s3.ap-northeast-2.amazonaws.com/dummy/places/cafe_12.png',
  },
  {
    name: '제스티 살룬 새우버거 건대 본점',
    src: 'https://spokerthon-39.s3.ap-northeast-2.amazonaws.com/dummy/places/cafe_05.png',
  },
  {
    name: '우리집',
    src: 'https://spokerthon-39.s3.ap-northeast-2.amazonaws.com/dummy/places/tea_01.png',
  },
] as const;

type PhonePreviewType = 'matching' | 'message' | 'requests' | 'places';

interface PhonePreviewProps {
  large?: boolean;
  type: PhonePreviewType;
}

const PhonePreview = ({ large = false, type }: PhonePreviewProps) => {
  const profiles = [profileWoman1, profileWoman2, profileWoman1];

  return (
    <div
      className={
        large
          ? 'h-[667px] w-[375px] origin-top-left scale-[0.622] md:scale-[0.818]'
          : 'h-[667px] w-[375px] origin-top-left scale-[0.58] md:scale-[0.63]'
      }
    >
      <div className="relative h-[667px] w-[375px] overflow-hidden bg-white text-black">
        <div className="flex h-[54px] items-center justify-between px-7 text-base font-semibold">
          <span>9:41</span>
          <span className="text-sm">▰</span>
        </div>

        {type === 'matching' && (
          <>
            <div className="flex h-[50px] items-center px-5">
              <img src={logo} alt="오작교" className="h-[30px] w-[110px]" />
            </div>
            <div className="absolute top-[151px] left-[-292px] h-[360px] w-[310px] rounded-[10px] bg-primary-10" />
            <div className="absolute top-[151px] left-[358px] h-[360px] w-[310px] rounded-[10px] bg-primary-10" />
            <div className="absolute top-[115px] left-8 z-10 h-[358px] w-[310px] overflow-hidden rounded-[10px] bg-primary-10">
              <img
                src={matchingImage}
                alt="이영애님의 매칭 프로필"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="absolute inset-x-0 top-[500px] text-center text-sm font-medium text-grey-4">
              당신과 가까이 있는 데이트 상대예요!
            </p>
            <button className="absolute top-[533px] left-5 flex w-[335px] items-center justify-center gap-2 rounded-[10px] bg-primary-100 py-4 text-lg font-semibold text-white">
              다음 사람 보기 <IcArrowRight className="size-6" />
            </button>
          </>
        )}

        {type === 'message' && (
          <>
            <h3 className="absolute top-[74px] left-[22px] text-[22px] leading-[1.5] font-bold">
              상대에게 보낼
              <br /> 짧은 쪽지를 작성해주세요
            </h3>
            <div className="absolute top-[160px] left-[20px] flex h-[149px] w-[335px] flex-col justify-between rounded-[10px] border border-grey-4 p-5 text-base font-medium text-grey-4">
              <span className="owner-message-typing text-grey-10">
                같이 산책하실래요?
              </span>
              <span className="text-right">(0/50)</span>
            </div>
            <button className="owner-message-send absolute top-[528px] left-[20px] w-[335px] rounded-[10px] bg-grey-5 py-4 text-lg font-semibold text-white">
              쪽지 보내기
            </button>
          </>
        )}

        {type === 'requests' && (
          <>
            <div className="absolute top-[65px] left-5 flex w-[335px] items-end justify-between">
              <h3 className="text-[22px] font-bold">받은 쪽지</h3>
              <p className="text-base font-medium">
                나에게 요청을 보낸 사람들이에요.
              </p>
            </div>
            <div className="absolute top-[119px] left-5 flex w-[335px] rounded-[10px] bg-primary-10 p-0.5 text-base">
              <span className="flex-1 rounded-lg bg-white py-2 text-center font-semibold">
                기다리는 사랑
              </span>
              <span className="flex-1 py-2 text-center font-medium">
                이어진 사랑
              </span>
            </div>
            <div className="absolute top-[180px] left-5 w-[335px]">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="flex gap-2 border-b border-grey-1 py-3"
                >
                  <img
                    src={profile}
                    alt="가상의 시니어 여성 프로필"
                    className="size-[78px] rounded-[10px] object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <b className="text-lg">
                          {['이영희', '박정숙', '최미자'][index]}
                        </b>{' '}
                        <span className="text-xs text-grey-5">
                          {[67, 70, 65][index]}
                        </span>
                      </div>
                      <button className="flex items-center gap-1 rounded-[10px] bg-primary-100 px-3 py-2 text-sm text-white">
                        전화 걸기 <IcCall className="size-4" />
                      </button>
                    </div>
                    <p className="rounded-[10px] bg-grey-1 p-2 text-center text-xs">
                      “같이 산책하고 싶어요.”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {type === 'places' && (
          <>
            <div className="absolute top-[65px] left-5 flex w-[335px] items-end justify-between">
              <h3 className="text-[22px] font-bold">근처 장소</h3>
              <p className="text-base font-medium">
                분위기 좋은 장소 추천이에요.
              </p>
            </div>
            <p className="absolute top-[109px] left-5 w-[335px] rounded-[10px] bg-grey-1 py-3 text-center text-base font-medium">
              통화한 분과 근처 장소에서 만나보세요!
            </p>
            <div className="absolute top-[175px] left-5 w-[335px]">
              {PLACE_IMAGES.map(({ name, src }, index) => (
                <div key={name} className="border-b border-grey-1 py-4">
                  <div className="flex gap-2">
                    <img
                      src={src}
                      alt={`${name} 사진`}
                      className="size-[75px] shrink-0 rounded-[10px] object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <b className="text-lg">{name}</b>
                        <span className="text-xs text-grey-3">
                          {index === 2 ? '2.0KM' : '1.0KM'}
                        </span>
                      </div>
                      <span className="text-sm text-grey-5">
                        {
                          [
                            '광진구 능동로 127',
                            '광진구 능동로 26',
                            '광진구 능동로 98',
                          ][index]
                        }
                      </span>
                      <span className="mt-1 text-xs text-primary-100">
                        지도보기 ›
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 rounded-[10px] bg-grey-1 px-4 py-2.5 text-xs">
                    <>
                      <b>제휴 혜택</b>{' '}
                      {
                        [
                          '시니어 커플 5% 할인',
                          '시니어 커플 사이다 무료',
                          '시니어 커플 10% 할인',
                        ][index]
                      }
                    </>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 flex h-[60px] items-center justify-between bg-white px-[68px] shadow-[0_-2px_3px_var(--color-grey-shadow)]">
          {[
            {
              label: '매칭',
              active: type === 'matching' || type === 'message',
              Active: IcHeartActive,
              Default: IcHeartDefault,
            },
            {
              label: '받은쪽지',
              active: type === 'requests',
              Active: IcRequestActive,
              Default: IcRequestDefault,
            },
            {
              label: '안심장소',
              active: type === 'places',
              Active: IcCompassActive,
              Default: IcCompassDefault,
            },
          ].map(({ label, active, Active, Default }) => (
            <div
              key={label}
              className="flex size-10 flex-col items-center text-grey-6"
            >
              {active ? (
                <Active className="size-6" />
              ) : (
                <Default className="size-6" />
              )}
              <span
                className={`text-[10px] whitespace-nowrap ${active ? 'font-semibold' : 'font-medium'}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
