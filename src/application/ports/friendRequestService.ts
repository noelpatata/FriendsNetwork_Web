import { FriendRequestDTO } from "../../domain/models/FriendRequestDTO";
import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';

export interface FriendRequestService {
  sendFriendRequest: (
    onlineId: string,
    token: string
  ) => Promise<{ response: BaseResponseDTO<FriendRequestDTO>;}>;

  getFriendRequests: (
    token: string
  ) => Promise<{ response: BaseResponseDTO<FriendRequestDTO[]>;}>;

  acceptFriendRequest: (
    onlineId: string,
    token: string
  ) => Promise<{ response: BaseResponseDTO<string> }>;

  rejectFriendRequest: (
    onlineId: string,
    token: string
  ) => Promise<{ response: BaseResponseDTO<string> }>;
}
