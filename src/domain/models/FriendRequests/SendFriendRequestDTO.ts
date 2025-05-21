import { UserDTO } from "../UserDTO";

export interface SendFriendRequestDTO {
    accepted: boolean;
    receiver: UserDTO
    sentAt: string;
  }