// 안심장소 한 곳의 정보예요. API 연동 때 실제 응답을 찍어 보고 맞춰요.
export interface Place {
  placeId: number;
  name: string;
  // 사진이 없는 장소는 null이에요.
  imageUrl: string | null;
  address: string;
  // 나와의 거리(km)예요.
  distance: number;
  benefitText: string;
  naverMapUrl: string;
}
