import { FriendRequestService } from "../../application/ports/friendRequestService";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const friendRequestApi: FriendRequestService = {
  sendFriendRequest: async (onlineId, token) => {
    const response = await fetch(`${API_BASE_URL}friendrequest/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FriendOnlineId: onlineId }),
    });

    const data = await response.json();
    return {
      response: data
    };
  },

  getFriendRequests: async (token) => {
    const response = await fetch(`${API_BASE_URL}friendrequest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return {
        response: data
    };
  },

  acceptFriendRequest: async (onlineId, token) => {
    const response = await fetch(`${API_BASE_URL}friendrequest/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FriendOnlineId: onlineId }),
    });

    const data = await response.json();
    return {
        response: data
    };
  },

  rejectFriendRequest: async (onlineId, token) => {
    const response = await fetch(`${API_BASE_URL}friendrequest/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FriendOnlineId: onlineId }),
    });

    const data = await response.json();
    return {
        response: data
    };
  },
};
