export type ReceivedRequestStatus = 'PENDING' | 'CONNECTED';

export interface ReceivedRequestPerson {
  userId: number;
  nickname: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  profileImageUrl: string | null;
  phoneNumber: string;
  distance: number | null;
}

export interface ReceivedRequest {
  requestId: number;
  status: ReceivedRequestStatus;
  message: string | null;
  createdAt: string;
  requester: ReceivedRequestPerson;
}

export interface ReceivedRequestsData {
  requests: ReceivedRequest[];
}

export interface CallConnectData {
  requestId: number;
  status: ReceivedRequestStatus;
}
