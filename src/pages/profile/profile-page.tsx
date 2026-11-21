import { useLocation, useNavigate } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';
import type { ReceivedRequest } from '@/shared/types/received-request';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = (location.state as { request?: ReceivedRequest } | null)
    ?.request;
  const requester = request?.requester;
  const distance = requester?.distance;

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white">
      <header className="flex h-[47px] shrink-0 items-center justify-center">
        <h1 className="text-title-sb-18">상세 프로필</h1>
      </header>
      <section className="px-5">
        <div className="relative flex h-[284px] items-end overflow-hidden rounded-[10px] bg-grey-2">
          {requester?.profileImageUrl && (
            <img
              src={requester.profileImageUrl}
              alt={`${requester.nickname}님의 프로필 사진`}
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <div className="relative w-full bg-gradient-black px-5 py-4 text-white">
            <h2 className="text-title-b-20">
              {requester?.nickname ?? '상세 프로필'}{' '}
              {requester && <span>{requester.age}</span>}
            </h2>
            {distance !== null && distance !== undefined && (
              <p className="text-text-m-12 text-grey-3">
                나와의 거리 · {(distance / 1000).toFixed(1)}km
              </p>
            )}
          </div>
        </div>
        {request?.message && (
          <p className="mt-3 rounded-[10px] bg-primary-10 px-5 py-4 text-title-m-16">
            {request.message}
          </p>
        )}
      </section>
      <div className="mt-auto shrink-0 px-5 pt-4 pb-5">
        <button
          type="button"
          onClick={() => navigate(ROUTES.REQUEST)}
          className="w-full rounded-[10px] bg-primary-100 py-4 text-title-sb-18 text-white"
        >
          확인
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
