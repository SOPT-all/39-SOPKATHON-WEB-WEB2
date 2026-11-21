import { useNavigate } from 'react-router';

import matchingWoman from '@/shared/assets/images/img-matching-woman.png';
import { ROUTES } from '@/shared/constants/routes';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white">
      <header className="flex h-[47px] shrink-0 items-center justify-center">
        <h1 className="text-title-sb-18">상세 프로필</h1>
      </header>
      <section className="px-5">
        <div className="relative flex h-[284px] items-end overflow-hidden rounded-[10px]">
          <img
            src={matchingWoman}
            alt="이영애님의 프로필 사진"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative w-full bg-gradient-black px-5 py-4 text-white">
            <h2 className="text-title-b-20">
              이영애 <span>66</span>
            </h2>
            <p className="text-text-m-12 text-grey-3">나와의 거리 · 2km</p>
          </div>
        </div>
        <p className="mt-3 rounded-[10px] bg-primary-10 px-5 py-4 text-title-m-16">
          멋진 사람.
          <br />
          멋있는 당신과 커피 한 잔. 즐기고 싶어요.
          <br />
          저는 쌍화차로^^
        </p>
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
