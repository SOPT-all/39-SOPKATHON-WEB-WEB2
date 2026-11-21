import type { Gender } from '@/pages/onboarding/types';

// 사진과 함께 보내는 내 정보예요.
export interface OnboardingRequest {
  nickname: string;
  gender: Gender;
  age: number;
  latitude: number;
  longitude: number;
}

// 실제 응답을 찍어서 확인한 모양이에요.
// { "userId": 25, "nickname": "테스트", "gender": "MALE", "age": 66, "profileImageUrl": "https://..." }
export interface OnboardingResponse {
  userId: number;
  nickname: string;
  gender: Gender;
  age: number;
  profileImageUrl: string;
}
