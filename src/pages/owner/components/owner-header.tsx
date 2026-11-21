import { NavLink } from 'react-router';

import logo from '@/shared/assets/images/logo.png';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/utils/cn';

const OwnerHeader = () => {
  return (
    <header className="flex h-[70px] w-full items-center justify-between px-5 md:h-[90px] md:px-10 xl:px-[120px]">
      <NavLink to={ROUTES.OWNER} aria-label="오작교 서비스 소개">
        <img src={logo} alt="오작교" className="h-[30px] w-[110px] object-contain" />
      </NavLink>
      <nav
        className="flex items-center gap-2.5"
        aria-label="사장님 페이지 메뉴"
      >
        {[
          { label: '서비스 소개', to: ROUTES.OWNER },
          { label: '우리 가게 제휴 신청', to: ROUTES.OWNER_APPLY },
        ].map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                'rounded-[10px] px-3 py-2 text-sm font-semibold md:px-5 md:py-2.5 md:text-[15px]',
                isActive ? 'bg-black text-white' : 'bg-white text-black',
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default OwnerHeader;
