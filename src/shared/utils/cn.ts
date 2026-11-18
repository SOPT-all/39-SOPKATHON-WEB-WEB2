import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 조건부 클래스를 합치고, 겹치는 Tailwind 클래스는 뒤의 것만 남겨요.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
