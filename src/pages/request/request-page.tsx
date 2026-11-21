import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import matchingMan from '@/shared/assets/images/img-matching-man.png';
import matchingWoman from '@/shared/assets/images/img-matching-woman.png';
import profileWoman from '@/shared/assets/images/img-owner-profile-woman-1.png';
import CallConfirmModal from '@/shared/components/call-confirm-modal';
import Message from '@/shared/components/message';
import SmallButton from '@/shared/components/small-button';
import { ROUTES } from '@/shared/constants/routes';

const REQUESTS = [
  {
    name: '김철수',
    age: 64,
    distance: '2.0KM',
    message: '너무 아름다우시네요',
    image: matchingMan,
  },
  {
    name: '이영애',
    age: 66,
    distance: '2.0KM',
    message:
      '멋진 사람. 멋있는 당신과 커피 한 잔. 즐기고 싶어요. 저는 쌍화차로^^',
    image: matchingWoman,
  },
  {
    name: '박순자',
    age: 67,
    distance: '4.0KM',
    message: '당신은 나의 동반자.',
    image: profileWoman,
  },
  {
    name: '공지철',
    age: 64,
    distance: '6.0KM',
    message: '새로운 설렘을 느끼고 싶습니다.',
    image: matchingMan,
  },
];

const RequestPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'waiting' | 'connected'>('waiting');
  const [callingIndex, setCallingIndex] = useState<number | null>(null);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <header className="flex shrink-0 items-center justify-between gap-2 px-5 pt-5 pb-4">
        <h1 className="text-title-b-22">받은 쪽지</h1>
        <p className="text-right text-text-m-14 text-grey-4">
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
        {REQUESTS.map((person, index) => (
          <article key={person.name} className="border-b border-grey-1 py-3">
            <div className="flex items-center justify-between gap-2">
              <Link
                to={ROUTES.PROFILE.replace(':requestId', String(index + 1))}
                className="flex min-w-0 items-center gap-2.5"
              >
                <img
                  src={person.image}
                  alt=""
                  className="size-[45px] shrink-0 rounded-[10px] object-cover"
                />
                <span className="min-w-0">
                  <span className="flex items-baseline gap-1">
                    <b className="text-title-sb-18">{person.name}</b>
                    <span className="text-text-m-12 text-grey-5">
                      {person.age}세
                    </span>
                  </span>
                  <span className="block text-text-m-12 text-grey-3">
                    {person.distance}
                  </span>
                </span>
              </Link>
              <SmallButton
                className="shrink-0 px-4 text-text-m-14"
                onClick={() => setCallingIndex(index)}
              />
            </div>
            <Message className="mt-2 !h-[38px] !rounded-[10px] !bg-grey-1 !px-4 !py-2.5 !text-text-m-12">
              <span className="block truncate">{person.message}</span>
            </Message>
          </article>
        ))}
      </div>
      {callingIndex !== null && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-5"
          role="presentation"
          onClick={() => setCallingIndex(null)}
        >
          <CallConfirmModal
            onReject={() => setCallingIndex(null)}
            onConfirm={() => {
              const selectedIndex = callingIndex;
              setCallingIndex(null);
              navigate(
                ROUTES.PROFILE.replace(':requestId', String(selectedIndex + 1)),
              );
            }}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};

export default RequestPage;
