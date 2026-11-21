import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

interface MatchUser {
  userId: number;
  nickname: string;
  age: number;
  profileImageUrl: string;
  distance: number;
}

interface MatchList {
  users: MatchUser[];
  hasNext: boolean;
}

export const getMatches = async (signal?: AbortSignal) => {
  const res = await axiosInstance.get<ApiResponse<MatchList>>(
    '/api/v1/matches',
    {
      params: { limit: 10 },
      signal,
    },
  );
  const { users, hasNext } = res.data.data;
  return {
    profiles: users.map(
      ({ userId, nickname, age, profileImageUrl, distance }) => ({
        id: userId,
        name: nickname,
        age,
        imageUrl: profileImageUrl,
        distanceKm: distance / 1000,
      }),
    ),
    hasNext,
  };
};
