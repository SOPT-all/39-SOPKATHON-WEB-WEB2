import type { PlaceListResponse } from '@/pages/place/api/types';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

const PAGE_SIZE = 20;

// 내 위치에서 가까운 순으로 안심장소 목록을 받아요. page는 0부터 시작해요.
export const getPlaces = async (page: number) => {
  const res = await axiosInstance.get<ApiResponse<PlaceListResponse>>(
    '/api/v1/places',
    { params: { page, size: PAGE_SIZE } },
  );

  return res.data.data;
};
