import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';

import MatchingCard from '@/pages/matching/components/matching-card';
import { getMatches } from '@/pages/matching/api/get-matches';
import { skipMatch } from '@/pages/matching/api/skip-match';
import matchingEmptyImage from '@/shared/assets/images/img-matching-empty.svg';
import MatchingAppBar from '@/shared/components/matching-app-bar';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import type { MatchingProfile } from '@/shared/types/matching-profile';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/utils/cn';

const MatchingPage = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<MatchingProfile[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [skipError, setSkipError] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    getMatches(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setProfiles(result.profiles);
        setHasMore(result.hasNext);
        setActiveIndex(0);
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });
    return () => controller.abort();
  }, [attempt]);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const currentIndex = activeIndex;
  const hasNext = activeIndex < profiles.length;

  const handleNext = async () => {
    if (!hasNext || isAdvancing) return;
    setIsAdvancing(true);
    setSkipError(false);
    setActiveIndex(activeIndex + 1);
    try {
      await skipMatch(profiles[activeIndex].id);
    } catch {
      setActiveIndex(activeIndex);
      setSkipError(true);
      setIsAdvancing(false);
      return;
    }
    if (hasMore && profiles.length - activeIndex <= 2) {
      try {
        const next = await getMatches();
        const known = new Set(profiles.map((profile) => profile.id));
        setProfiles([
          ...profiles,
          ...next.profiles.filter((profile) => !known.has(profile.id)),
        ]);
        setHasMore(next.hasNext);
      } catch {
        if (activeIndex + 1 === profiles.length) setStatus('error');
      }
    }
    setIsAdvancing(false);
  };

  if (status !== 'ready' || (!hasNext && isAdvancing))
    return (
      <main className="flex flex-1 flex-col pt-2.5 sm:pt-0">
        <MatchingAppBar />
        <div className="m-auto text-center" role="status">
          {status === 'loading' || isAdvancing
            ? '상대를 찾고 있어요.'
            : '매칭 상대를 불러오지 못했어요.'}
          {status === 'error' && (
            <button
              type="button"
              onClick={() => {
                setStatus('loading');
                setAttempt((value) => value + 1);
              }}
            >
              다시 시도
            </button>
          )}
        </div>
      </main>
    );
  return (
    // 휴대폰에서는 로고 위에 다른 화면의 제목과 같은 높이만큼 여백을 줘요.
    // PC의 화면 틀에서는 위쪽 54px 영역이 그 역할을 해서 따로 주지 않아요.
    <main className="flex min-h-0 flex-1 [scrollbar-width:none] flex-col overflow-x-hidden overflow-y-auto pt-2.5 sm:pt-0">
      <MatchingAppBar />
      <h1 className="sr-only">매칭 상대</h1>
      {/* 로고는 위에, 안내와 버튼은 아래에 붙어 있어요. 카드는 그 사이 남는 공간의 가운데에 놓여요. */}
      <div className="flex flex-1 flex-col justify-center">
        <div
          className="relative mt-4.25 mb-6.75 h-89.5 shrink-0 sm:mt-2.75"
          aria-label="매칭 카드"
        >
          {[-1, ...profiles.map((_, index) => index), profiles.length].map(
            (index) => {
              const offset = index - currentIndex;
              const profile = profiles[index];
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
                  {!hasNext && offset === 0 && (
                    <div className="flex size-full flex-col items-center justify-center gap-5 bg-grey-1">
                      <img
                        src={matchingEmptyImage}
                        alt=""
                        width="195"
                        height="157"
                      />
                      <p className="text-title-b-20 text-grey-4">
                        까치가 사랑을 물어오는 중..
                      </p>
                    </div>
                  )}
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0 bg-primary-10 transition-opacity duration-250 motion-reduce:duration-1',
                      offset === 0 ? 'opacity-0' : 'opacity-100',
                    )}
                  />
                </div>
              );
            },
          )}
        </div>
      </div>
      <div className="relative flex w-full max-w-93.75 shrink-0 flex-col gap-2 self-center pb-4.75">
        {skipError && (
          <p role="alert" className="text-center">
            넘기지 못했어요. 다시 시도해 주세요.
          </p>
        )}
        <p role="status" className="text-center text-text-m-14 text-grey-4">
          {hasNext
            ? '당신과 가까이 있는 데이트 상대에요!'
            : '더이상 가까이 있는 데이트 상대가 없어요.'}
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
    </main>
  );
};

export default MatchingPage;
