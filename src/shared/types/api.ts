// 서버 응답의 공통 모양이에요. 실제 응답을 찍어 보고 다르면 여기를 맞춰요.
// 예: { "success": true, "code": "GLB-S001", "message": "요청이 성공했습니다.", "data": { ... } }
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

// 실패했을 때는 data 없이 와요.
export interface ApiErrorResponse {
  success: boolean;
  code: string;
  message: string;
}
