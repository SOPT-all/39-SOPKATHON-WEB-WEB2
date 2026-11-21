import { isAxiosError } from 'axios';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

export const skipMatch = async (targetId: number) => {
  try {
    await axiosInstance.post<Omit<ApiResponse<void>, 'data'>>(
      `/api/v1/matches/${targetId}/skip`,
    );
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.code === 'GLB-E009')
      return;
    throw error;
  }
};
