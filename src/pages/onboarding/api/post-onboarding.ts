import type {
  OnboardingRequest,
  OnboardingResponse,
} from '@/pages/onboarding/api/types';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 프로필 사진과 내 정보를 등록해요.
// 사진은 파일로, 나머지 정보는 JSON으로 한 요청(multipart)에 같이 담아 보내요.
export const postOnboarding = async (
  profileImage: File,
  request: OnboardingRequest,
) => {
  const formData = new FormData();

  formData.append('profileImage', profileImage);
  // 서버가 JSON으로 읽을 수 있게 타입을 application/json으로 정해서 넣어요.
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  );

  const res = await axiosInstance.post<ApiResponse<OnboardingResponse>>(
    '/api/v1/users/me/onboarding',
    formData,
  );

  return res.data.data;
};
