import type { LoginRequest, LoginResponse } from '@/pages/login/api/types';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 전화번호로 로그인해요. 처음 보는 번호면 서버가 새 사용자를 만들어 줘요.
export const postLogin = async (body: LoginRequest) => {
  const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
    '/api/v1/auth/login',
    body,
  );

  return res.data.data;
};
