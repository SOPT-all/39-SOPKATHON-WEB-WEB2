import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import getReceivedRequests from '@/shared/api/get-received-requests';
import { ROUTES } from '@/shared/constants/routes';
import { getUserId } from '@/shared/utils/user-id';

const CHECK_INTERVAL_MS = 3_000;

// 어디까지 봤는지는 사용자마다 따로 브라우저에 기억해요.
const getSeenRequestId = () => {
  const userId = getUserId();

  if (userId === null) return 0;

  return Number(localStorage.getItem(`lastSeenRequestId:${userId}`) ?? 0);
};

const setSeenRequestId = (requestId: number) => {
  const userId = getUserId();

  if (userId === null) return;

  localStorage.setItem(`lastSeenRequestId:${userId}`, String(requestId));
};

// 아직 보지 않은 새 쪽지가 있는지 알려 줘요. 받은쪽지 탭의 빨간 점에 써요.
// - 일정 간격으로 받은 쪽지를 확인해요. 화면이 안 보일 때는 쉬어요.
// - 받은쪽지 화면에 들어가면 지금까지 온 쪽지를 본 것으로 처리해요.
export const useHasNewRequest = () => {
  const { pathname } = useLocation();
  const isRequestPage = pathname.startsWith(ROUTES.REQUEST);
  const [latestRequestId, setLatestRequestId] = useState(0);

  useEffect(() => {
    if (getUserId() === null) return;

    let isActive = true;

    const check = async () => {
      if (document.hidden) return;

      try {
        const res = await getReceivedRequests(false);
        const requestIds = res.data.data.requests.map(
          (request) => request.requestId,
        );

        if (isActive) setLatestRequestId(Math.max(0, ...requestIds));
      } catch {
        // 확인에 실패하면 이번에는 건너뛰고 다음 차례에 다시 확인해요.
      }
    };

    void check();

    const intervalId = window.setInterval(
      () => void check(),
      CHECK_INTERVAL_MS,
    );

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  // 받은쪽지 화면을 보고 있으면 지금까지 온 쪽지를 본 것으로 기억해요.
  useEffect(() => {
    if (isRequestPage && latestRequestId > getSeenRequestId()) {
      setSeenRequestId(latestRequestId);
    }
  }, [isRequestPage, latestRequestId]);

  return !isRequestPage && latestRequestId > getSeenRequestId();
};
