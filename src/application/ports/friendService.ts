import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';
import { DeleteFriendViewModel } from '../../domain/models/Friends/DeleteFriendViewModel';
import { FriendsViewModel } from "../../domain/models/Friends/FriendsViewModel";

export interface FriendService {
    getFriends: (
        token: string
    ) => Promise<BaseResponseDTO<FriendsViewModel | null>>;

    deleteFriend: (
        token: string,
        onlineId: string,
    ) => Promise<BaseResponseDTO<DeleteFriendViewModel>>;
}