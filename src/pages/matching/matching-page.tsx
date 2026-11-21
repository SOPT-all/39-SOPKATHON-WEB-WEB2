import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router';

import MatchingCard from '@/pages/matching/components/matching-card';
import MatchingAppBar from '@/shared/components/matching-app-bar';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { MATCHING_PREVIEW_PROFILES } from '@/shared/constants/matching-preview';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/utils/cn';

const MatchingPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const currentIndex = activeIndex + (isAdvancing ? 1 : 0);
  const hasNext = activeIndex < MATCHING_PREVIEW_PROFILES.length - 1;

  const handleNext = () => {
    if (!hasNext || isAdvancing) return;
    setIsAdvancing(true);
  };

  const handleTransitionEnd = () => {
    if (!isAdvancing) return;
    setActiveIndex((index) => index + 1);
    setIsAdvancing(false);
  };

  return (
    <main className="flex min-h-0 flex-1 [scrollbar-width:none] flex-col overflow-x-hidden overflow-y-auto">
      {/* 로고부터 버튼까지 한 묶음이에요. 화면이 길면 남는 여백이 묶음의 위아래로 똑같이 나뉘어요. */}
      <div className="my-auto flex shrink-0 flex-col">
        <MatchingAppBar />
        <h1 className="sr-only">매칭 상대</h1>
        <div className="relative mt-2.75 h-89.5" aria-label="매칭 카드">
          {[
            -1,
            ...MATCHING_PREVIEW_PROFILES.map((_, index) => index),
            MATCHING_PREVIEW_PROFILES.length,
          ].map((index) => {
            const offset = index - currentIndex;
            const profile = MATCHING_PREVIEW_PROFILES[index];
            return (
              <div
                key={index}
                inert={offset !== 0 || isAdvancing}
                aria-hidden={offset !== 0}
                className={cn(
                  'absolute top-0 left-[calc(50%-1.5px)] h-89.5 w-77.5 max-w-[calc(100%-64px)] -translate-x-1/2 overflow-hidden rounded-[10px] transition-transform duration-250 ease-out motion-reduce:duration-1',
                  offset === 0 && 'z-10',
                )}
                style={{
                  transform: `translateX(calc(${offset * 100}% + ${offset * 16}px)) translateY(${offset === 0 ? 0 : 40}px)`,
                }}
                onTransitionEnd={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    event.propertyName === 'transform' &&
                    index === activeIndex
                  )
                    handleTransitionEnd();
                }}
              >
                {profile && (
                  <MatchingCard
                    profile={profile}
                    onMessage={() =>
                      navigate(
                        generatePath(ROUTES.MESSAGE, {
                          targetId: String(profile.id),
                        }),
                        { state: { profile } },
                      )
                    }
                  />
                )}
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-primary-10 transition-opacity duration-250 motion-reduce:duration-1',
                    profile && offset === 0 ? 'opacity-0' : 'opacity-100',
                  )}
                />
              </div>
            );
          })}
        </div>
        <div className="relative mt-6.75 flex w-full max-w-93.75 shrink-0 flex-col gap-2 self-center pb-4.75">
          <p className="text-center text-text-m-14 text-grey-4">
            당신과 가까이 있는 데이트 상대에요!
          </p>
          <div className="px-4.5">
            <ServiceEntryButton
              className="px-5"
              showArrow
              status={!hasNext || isAdvancing ? 'disabled' : 'active'}
              onClick={handleNext}
            >
              다음 사람 보기
            </ServiceEntryButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MatchingPage;
