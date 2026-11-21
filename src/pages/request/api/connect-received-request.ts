import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';
import type { CallConnectData } from '@/shared/types/received-request';

const connectReceivedRequest = (requestId: number) =>
  axiosInstance.patch<ApiResponse<CallConnectData>>(
    `/api/v1/call-requests/${requestId}/connect`,
  );

export default connectReceivedRequest;
