import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// global.css의 타이포 토큰이에요. 토큰을 추가하면 여기에도 추가해요.
const FONT_SIZES = [
  'title-b-22',
  'title-m-22',
  'title-b-20',
  'title-m-20',
  'title-sb-18',
  'title-m-18',
  'title-sb-16',
  'title-m-16',
  'text-sb-14',
  'text-m-14',
  'text-sb-12',
  'text-m-12',
  'label-sb-10',
  'label-m-10',
];

// text-title-sb-18(크기)과 text-grey-1(색)이 서로를 지우지 않게 크기 클래스를 알려 줘요.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: FONT_SIZES }],
    },
  },
});

// 조건부 클래스를 합치고, 겹치는 Tailwind 클래스는 뒤의 것만 남겨요.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
