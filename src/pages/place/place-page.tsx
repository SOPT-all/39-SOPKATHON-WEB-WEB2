import type { UIEvent } from 'react';

import PlaceCard from '@/pages/place/components/place-card';
import { usePlaces } from '@/pages/place/hooks/use-places';

// 목록 끝에서 이만큼 남았을 때 다음 쪽을 미리 받아요.
const LOAD_MORE_OFFSET = 200;

const PlacePage = () => {
  const { places, status, isLoadingMore, loadMore, retry } = usePlaces();

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop - clientHeight < LOAD_MORE_OFFSET) {
      void loadMore();
    }
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      {/* 제목은 고정이고, 아래 목록만 스크롤돼요. */}
      <header className="flex shrink-0 items-center justify-between gap-2 px-5 pt-5 pb-2.5">
        <h1 className="shrink-0 text-title-b-22 text-black">안심장소</h1>
        <p className="truncate text-title-m-16 text-grey-4">
          분위기 좋은 장소 추천이에요.
        </p>
      </header>
      {status === 'loading' && (
        <p role="status" className="m-auto text-title-m-16 text-grey-4">
          장소를 불러오는 중이에요.
        </p>
      )}
      {status === 'error' && (
        <div className="m-auto flex flex-col items-center gap-3">
          <p role="alert" className="text-title-m-16 text-grey-5">
            장소를 불러오지 못했어요.
          </p>
          <button
            type="button"
            className="text-title-sb-16 text-primary-100"
            onClick={retry}
          >
            다시 시도
          </button>
        </div>
      )}
      {status === 'ready' && places.length === 0 && (
        <p className="m-auto text-title-m-16 text-grey-4">
          근처에 안심장소가 아직 없어요.
        </p>
      )}
      {status === 'ready' && places.length > 0 && (
        <ul
          className="flex min-h-0 flex-1 [scrollbar-width:none] flex-col overflow-y-auto px-5"
          onScroll={handleScroll}
        >
          {places.map((place) => (
            <li key={place.placeId}>
              <PlaceCard place={place} />
            </li>
          ))}
          {isLoadingMore && (
            <li className="py-4 text-center text-text-m-14 text-grey-4">
              더 불러오는 중이에요.
            </li>
          )}
        </ul>
      )}
    </main>
  );
};

export default PlacePage;
