// 안심장소 한 곳의 정보예요. 실제 응답을 찍어서 확인한 모양이에요.
export interface Place {
  placeId: number;
  name: string;
  // 사진이 없는 장소는 null이에요.
  imageUrl: string | null;
  address: string;
  // 나와의 거리예요. 단위는 미터예요. (예: 300)
  distance: number;
  benefitText: string;
  naverMapUrl: string;
}

// { "places": [...], "page": 0, "size": 20, "hasNext": true }
export interface PlaceListResponse {
  places: Place[];
  page: number;
  size: number;
  // 다음 쪽이 더 있는지예요.
  hasNext: boolean;
}
