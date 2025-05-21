import { FriendService } from "../../application/ports/friendService";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const friendApi: FriendService = {
  getFriends: async (usertoken) => {
    const res = await fetch(`${API_BASE_URL}friendship`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    });
    const data = await res.json();
    return data;
  },

  deleteFriend: async(token, onlineId) => {
    const res = await fetch(`${API_BASE_URL}friendship`, {
      method: "DELETE",
      headers : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({friendOnlineId: onlineId}),
    });

    const data = res.json();
    
    return data;
  }
};
