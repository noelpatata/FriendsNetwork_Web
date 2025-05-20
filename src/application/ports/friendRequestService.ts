import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';
import { FriendRequestsViewModel } from '../../domain/models/FriendRequests/FriendRequestsViewModel';
import { FriendRequestViewModel } from "../../domain/models/FriendRequests/FriendRequestViewModel";
import { SendFriendRequestViewModel } from "../../domain/models/FriendRequests/SendFriendRequestViewModel";

export interface FriendRequestService {
  sendFriendRequest: (
    FriendOnlineId: string,
    token: string
  ) => Promise<{ response: BaseResponseDTO<FriendRequestViewModel>;}>;

  getFriendRequests: (
    token: string
  ) => Promise<{ response: BaseResponseDTO<FriendRequestsViewModel>;}>;

  acceptFriendRequest: (
    FriendOnlineId: string,
    token: string
  ) => Promise<{ response: BaseResponseDTO<SendFriendRequestViewModel> }>;

  rejectFriendRequest: (
    FriendOnlineId: string,
    token: string
  ) => Promise<{ response: BaseResponseDTO<FriendRequestViewModel> }>;
}
