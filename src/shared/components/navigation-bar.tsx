import { NavLink } from 'react-router';

import IcCompassActive from '@/shared/assets/icons/ic-compass-active.svg?react';
import IcCompassDefault from '@/shared/assets/icons/ic-compass-default.svg?react';
import IcHeartActive from '@/shared/assets/icons/ic-heart-active.svg?react';
import IcHeartDefault from '@/shared/assets/icons/ic-heart-default.svg?react';
import IcRequestActive from '@/shared/assets/icons/ic-request-active.svg?react';
import IcRequestDefault from '@/shared/assets/icons/ic-request-default.svg?react';
import { ROUTES } from '@/shared/constants/routes';

const NAVIGATION_ITEMS = [
  {
    label: '매칭',
    path: ROUTES.MATCHING,
    ActiveIcon: IcHeartActive,
    DefaultIcon: IcHeartDefault,
  },
  {
    label: '받은요청',
    path: ROUTES.REQUEST,
    ActiveIcon: IcRequestActive,
    DefaultIcon: IcRequestDefault,
  },
  {
    label: '근처장소',
    path: ROUTES.PLACE,
    ActiveIcon: IcCompassActive,
    DefaultIcon: IcCompassDefault,
  },
] as const;

const NavigationBar = () => {
  return (
    <nav
      className="sticky bottom-0 z-10 shrink-0 bg-white py-2.5 shadow-[0_-2px_3px] shadow-grey-shadow"
      aria-label="하단 내비게이션"
    >
      <ul className="mx-auto flex w-full max-w-[239px] items-center justify-between">
        {NAVIGATION_ITEMS.map(({ label, path, ActiveIcon, DefaultIcon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className="flex size-10 flex-col items-center text-grey-6"
              aria-label={label}
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <ActiveIcon className="size-6" />
                  ) : (
                    <DefaultIcon className="size-6" />
                  )}
                  <span className="text-label-m-10 whitespace-nowrap">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
