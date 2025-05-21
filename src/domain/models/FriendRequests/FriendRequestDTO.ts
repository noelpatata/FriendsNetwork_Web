import { UserDTO } from "../UserDTO";

export interface FriendRequestDTO {
    accepted: boolean;
    sender: UserDTO
    sentAt: string;
  }