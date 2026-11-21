import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import CallConfirmModal from '@/shared/components/call-confirm-modal';
import Message from '@/shared/components/message';
import SmallButton from '@/shared/components/small-button';
import { ROUTES } from '@/shared/constants/routes';
import type { ReceivedRequest } from '@/shared/types/received-request';

import connectReceivedRequest from './api/connect-received-request';
import getReceivedRequests from '@/shared/api/get-received-requests';

const REFRESH_INTERVAL_MS = 3_000;

const RequestPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'waiting' | 'connected'>('waiting');
  const [requests, setRequests] = useState<ReceivedRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);
  const [callingRequest, setCallingRequest] = useState<ReceivedRequest | null>(
    null,
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState('');

  useEffect(() => {
    let isActive = true;
    const loadRequests = async (showLoading = false) => {
      if (showLoading) {
        setIsLoading(true);
        setRequests([]);
      }
      setError('');

      try {
        const response = await getReceivedRequests(tab === 'connected');
        if (isActive) setRequests(response.data.data.requests);
      } catch {
        if (isActive) setError('쪽지를 불러오지 못했어요. 다시 시도해주세요.');
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadRequests(true);
    const intervalId = window.setInterval(
      () => void loadRequests(),
      REFRESH_INTERVAL_MS,
    );

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [retryKey, tab]);

  const handleConfirmCall = async () => {
    if (!callingRequest || isConnecting) return;

    setIsConnecting(true);
    setConnectError('');

    try {
      const response = await connectReceivedRequest(callingRequest.requestId);
      const connectedRequest = {
        ...callingRequest,
        status: response.data.data.status,
      };
      setRequests((currentRequests) =>
        currentRequests.filter(
          (request) => request.requestId !== callingRequest.requestId,
        ),
      );
      setCallingRequest(null);
      navigate(ROUTES.PLACE, { state: { request: connectedRequest } });
    } catch {
      setConnectError('통화 완료 처리에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <header className="flex shrink-0 items-center justify-between gap-2 px-5 pt-5 pb-4">
        <h1 className="shrink-0 text-title-b-22">받은 쪽지</h1>
        <p className="truncate text-right text-title-m-16 text-grey-4">
          나에게 쪽지를 보낸 사람들이에요.
        </p>
      </header>
      <div className="mx-5 mb-2 flex shrink-0 rounded-[10px] bg-primary-10 p-0.5">
        {(
          [
            { id: 'waiting', label: '기다리는 사랑' },
            { id: 'connected', label: '이어진 사랑' },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex-1 rounded-lg py-2 text-text-m-14 ${tab === id ? 'bg-white font-semibold' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3">
        {error && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p role="alert" className="text-text-m-14 text-grey-5">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setRetryKey((key) => key + 1)}
              className="text-title-sb-16 text-primary-100"
            >
              다시 시도
            </button>
          </div>
        )}
        {isLoading && (
          <p className="py-12 text-center text-text-m-14 text-grey-4">
            쪽지를 불러오는 중이에요.
          </p>
        )}
        {!isLoading && !error && requests.length === 0 && (
          <p className="py-12 text-center text-text-m-14 text-grey-4">
            {tab === 'waiting'
              ? '아직 도착한 쪽지가 없어요.'
              : '아직 통화한 분이 없어요.'}
          </p>
        )}
        {!isLoading &&
          requests.map((request) => {
            const { requester } = request;
            const distance =
              requester.distance === null
                ? null
                : `${(requester.distance / 1000).toFixed(1)}KM`;

            return (
              <article
                key={request.requestId}
                className="border-b border-grey-1 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={ROUTES.PROFILE.replace(
                      ':requestId',
                      String(request.requestId),
                    )}
                    state={{ request }}
                    className="flex min-w-0 items-center gap-2.5"
                  >
                    {requester.profileImageUrl ? (
                      <img
                        src={requester.profileImageUrl}
                        alt=""
                        className="size-[45px] shrink-0 rounded-[10px] object-cover"
                      />
                    ) : (
                      <span className="size-[45px] shrink-0 rounded-[10px] bg-grey-2" />
                    )}
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-1">
                        <b className="truncate text-title-sb-18">
                          {requester.nickname}
                        </b>
                        <span className="shrink-0 text-text-m-12 text-grey-5">
                          {requester.age}세
                        </span>
                      </span>
                      {distance && (
                        <span className="block text-text-m-12 text-grey-3">
                          {distance}
                        </span>
                      )}
                    </span>
                  </Link>
                  <SmallButton
                    href={`tel:${requester.phoneNumber}`}
                    className="shrink-0 px-4 text-text-m-14"
                    onLinkClick={() => {
                      setConnectError('');
                      setCallingRequest(request);
                    }}
                  />
                </div>
                {request.message && (
                  <Message className="mt-2 !h-[38px] !rounded-[10px] !bg-grey-1 !px-4 !py-2.5 !text-text-m-12">
                    <span className="block truncate">{request.message}</span>
                  </Message>
                )}
                {!request.message && (
                  <p className="mt-2 text-text-m-12 text-grey-4">
                    쪽지 없이 번호를 보냈어요.
                  </p>
                )}
              </article>
            );
          })}
      </div>
      {callingRequest && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-5"
          role="presentation"
          onClick={() => {
            if (!isConnecting) setCallingRequest(null);
          }}
        >
          <div className="flex w-full max-w-[330px] flex-col items-center gap-3">
            <CallConfirmModal
              isLoading={isConnecting}
              onReject={() => setCallingRequest(null)}
              onConfirm={handleConfirmCall}
              onClick={(event) => event.stopPropagation()}
            />
            {connectError && (
              <p role="alert" className="text-center text-text-m-14 text-white">
                {connectError}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default RequestPage;
