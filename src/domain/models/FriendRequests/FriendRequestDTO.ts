import { UserDTO } from "../UserDTO";

export interface FriendRequestDTO {
    accepted: boolean;
    Sender: UserDTO
    sentAt: string;
  }