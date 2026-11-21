import { useState } from 'react';
import { Link } from 'react-router';

import IcCall from '@/shared/assets/icons/ic-call.svg?react';
import matchingMan from '@/shared/assets/images/img-matching-man.png';
import matchingWoman from '@/shared/assets/images/img-matching-woman.png';
import profileWoman from '@/shared/assets/images/img-owner-profile-woman-1.png';
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
  const [tab, setTab] = useState<'waiting' | 'connected'>('waiting');
  const [calling, setCalling] = useState(false);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <header className="flex shrink-0 items-center gap-3 px-5 pt-5 pb-4">
        <h1 className="text-title-b-22">받은 쪽지</h1>
        <p className="text-text-m-14 text-grey-4">
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
              <button
                type="button"
                onClick={() => setCalling(true)}
                className="flex shrink-0 items-center gap-2 rounded-[10px] bg-primary-100 px-4 py-2 text-text-m-14 text-white"
              >
                전화 걸기 <IcCall className="size-4" />
              </button>
            </div>
            <p className="mt-2 truncate rounded-[10px] bg-grey-1 px-4 py-2.5 text-text-m-12">
              {person.message}
            </p>
          </article>
        ))}
      </div>
      {calling && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-5"
          role="presentation"
          onClick={() => setCalling(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-confirm-title"
            className="w-full max-w-[330px] rounded-2xl bg-white p-6 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="call-confirm-title" className="text-title-b-20">
              통화를 하셨나요?
            </h2>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setCalling(false)}
                className="flex-1 rounded-[10px] bg-grey-1 py-3"
              >
                아니요
              </button>
              <button
                type="button"
                onClick={() => setCalling(false)}
                className="flex-1 rounded-[10px] bg-primary-100 py-3 text-white"
              >
                네, 했어요
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default RequestPage;
