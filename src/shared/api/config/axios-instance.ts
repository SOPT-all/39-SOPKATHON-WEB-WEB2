import axios, { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/shared/types/api';
import { getUserId } from '@/shared/utils/user-id';

const REQUEST_TIMEOUT_MS = 10_000;

// 서버 주소는 .env의 VITE_API_BASE_URL에서 가져와요.
// Content-Type은 axios가 보내는 데이터를 보고 정해요. (객체면 JSON, FormData면 multipart)
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

// 로그인한 뒤에는 모든 요청에 X-User-Id 헤더를 붙여요.
axiosInstance.interceptors.request.use((config) => {
  const userId = getUserId();

  if (userId !== null) {
    config.headers.set('X-User-Id', String(userId));
  }

  return config;
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
