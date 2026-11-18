// 서버 응답의 공통 모양이에요. 실제 응답을 찍어 보고 다르면 여기를 맞춰요.
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
}
