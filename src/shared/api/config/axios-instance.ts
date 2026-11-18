import axios, { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/shared/types/api';

const REQUEST_TIMEOUT_MS = 10_000;

// 서버 주소는 .env의 VITE_API_BASE_URL에서 가져와요.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // 개발 중에는 어떤 요청이 왜 실패했는지 콘솔에서 바로 볼 수 있어요.
    if (import.meta.env.DEV) {
      const status = error.response?.status ?? 'NETWORK';
      const message = error.response?.data?.message ?? error.message;
      console.error(
        `[API Error] ${status} ${error.config?.url ?? ''}`,
        message,
      );
    }

    return Promise.reject(error);
  },
);
