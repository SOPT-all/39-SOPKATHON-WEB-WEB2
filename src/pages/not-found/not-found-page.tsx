import { Link } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';

const NotFoundPage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요</h1>
      <Link to={ROUTES.LOGIN} className="underline">
        처음으로 돌아가기
      </Link>
    </main>
  );
};

export default NotFoundPage;
