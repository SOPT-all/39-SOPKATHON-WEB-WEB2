export interface LoginRequest {
  // 하이픈 없는 11자리 숫자예요. (예: 01012345678)
  phoneNumber: string;
}

// 실제 응답을 찍어서 확인한 모양이에요.
// { "userId": 25, "onboarded": false }
export interface LoginResponse {
  userId: number;
  // 온보딩(사진, 이름, 성별, 나이 등록)을 마쳤는지예요.
  onboarded: boolean;
}
