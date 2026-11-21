import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';
import type { ReceivedRequestsData } from '@/shared/types/received-request';

const getReceivedRequests = (called: boolean) =>
  axiosInstance.get<ApiResponse<ReceivedRequestsData>>(
    '/api/v1/call-requests/received',
    { params: { called } },
  );

export default getReceivedRequests;
