import { useCallback, useEffect, useRef, useState } from 'react';

import { getPlaces } from '@/pages/place/api/get-places';
import type { Place } from '@/pages/place/api/types';

type Status = 'loading' | 'ready' | 'error';

// 안심장소 목록을 받아 와요. loadMore를 부르면 다음 쪽을 이어서 받아요.
export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [hasNext, setHasNext] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const nextPageRef = useRef(1);

  // 첫 쪽을 받아요. "다시 시도"를 누르면 다시 받아요.
  useEffect(() => {
    let isActive = true;

    getPlaces(0)
      .then((data) => {
        if (!isActive) return;

        setPlaces(data.places);
        setHasNext(data.hasNext);
        nextPageRef.current = 1;
        setStatus('ready');
      })
      .catch(() => {
        if (isActive) setStatus('error');
      });

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const loadMore = useCallback(async () => {
    if (!hasNext || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const data = await getPlaces(nextPageRef.current);

      setPlaces((current) => [...current, ...data.places]);
      setHasNext(data.hasNext);
      nextPageRef.current += 1;
    } catch {
      // 이어 받기에 실패하면 지금까지 받은 목록은 그대로 두고, 다시 내리면 다시 시도해요.
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasNext, isLoadingMore]);

  const retry = useCallback(() => {
    setStatus('loading');
    setRetryCount((count) => count + 1);
  }, []);

  return { places, status, isLoadingMore, loadMore, retry };
};
