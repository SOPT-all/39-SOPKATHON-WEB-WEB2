import { NavLink } from 'react-router';

import IcCompassActive from '@/shared/assets/icons/ic-compass-active.svg?react';
import IcCompassDefault from '@/shared/assets/icons/ic-compass-default.svg?react';
import IcHeartActive from '@/shared/assets/icons/ic-heart-active.svg?react';
import IcHeartDefault from '@/shared/assets/icons/ic-heart-default.svg?react';
import IcRequestActive from '@/shared/assets/icons/ic-request-active.svg?react';
import IcRequestDefault from '@/shared/assets/icons/ic-request-default.svg?react';
import IcRequestNew from '@/shared/assets/icons/ic-request-new.svg?react';
import { ROUTES } from '@/shared/constants/routes';
import { useHasNewRequest } from '@/shared/hooks/use-has-new-request';

const NAVIGATION_ITEMS = [
  {
    label: '매칭',
    path: ROUTES.MATCHING,
    ActiveIcon: IcHeartActive,
    DefaultIcon: IcHeartDefault,
  },
  {
    label: '받은쪽지',
    path: ROUTES.REQUEST,
    ActiveIcon: IcRequestActive,
    DefaultIcon: IcRequestDefault,
  },
  {
    label: '안심장소',
    path: ROUTES.PLACE,
    ActiveIcon: IcCompassActive,
    DefaultIcon: IcCompassDefault,
  },
] as const;

const NavigationBar = () => {
  // 아직 보지 않은 새 쪽지가 있으면 받은쪽지 아이콘에 빨간 점을 보여 줘요.
  const hasNewRequest = useHasNewRequest();

  return (
    <nav
      className="sticky bottom-[env(safe-area-inset-bottom,0px)] z-10 shrink-0 bg-white py-2.5 shadow-[0_-2px_3px] shadow-grey-shadow"
      aria-label="하단 내비게이션"
    >
      <ul className="mx-auto flex w-full max-w-[239px] items-center justify-between">
        {NAVIGATION_ITEMS.map(({ label, path, ActiveIcon, DefaultIcon }) => {
          const InactiveIcon =
            path === ROUTES.REQUEST && hasNewRequest
              ? IcRequestNew
              : DefaultIcon;

          return (
            <li key={path}>
              <NavLink
                to={path}
                className="flex size-10 flex-col items-center text-grey-6"
                aria-label={
                  InactiveIcon === IcRequestNew
                    ? `${label}, 새 쪽지 있음`
                    : label
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <ActiveIcon className="size-6" />
                    ) : (
                      <InactiveIcon className="size-6" />
                    )}
                    <span className="text-label-m-10 whitespace-nowrap">
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationBar;
