import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

interface CreatedRequest {
  requestId: number;
  status: 'PENDING';
}

export const sendCallRequest = async (receiverId: number, message: string) => {
  const res = await axiosInstance.post<ApiResponse<CreatedRequest>>(
    '/api/v1/call-requests',
    {
      receiverId,
      message: message.trim() || undefined,
    },
  );
  return res.data.data;
};
