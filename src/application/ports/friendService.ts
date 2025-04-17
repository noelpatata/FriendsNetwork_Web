import { UserDTO } from "../../domain/models/UserDTO";
import { BaseResponseDTO } from '../../domain/models/BaseResponseDTO';

export interface FriendService {
    getFriends: (
        token: string
    ) => Promise<{ response: BaseResponseDTO<UserDTO[]> }>;

    deleteFriend: (
        token: string,
        onlineId: string,
    ) => Promise<{ response: BaseResponseDTO<UserDTO> }>;
}