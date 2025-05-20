import { UserDTO } from "./UserDTO";

export interface FriendRequestDTO {
    accepted: boolean;
    Receiver: UserDTO
    sentAt: string;
  }