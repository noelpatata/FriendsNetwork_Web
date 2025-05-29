import React, { useState, FormEvent } from "react";
import { useAuth } from "../AuthContext";
import { friendRequestApi } from "../adapters/api/friendRequestApi";

const SendFriendRequest: React.FC = () => {
  const { user } = useAuth();
  const [friendOnlineId, setFriendOnlineId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSendRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!friendOnlineId.trim()) {
      setError("Please provide a valid Online ID.");
      return;
    }

    try {
      const response = await friendRequestApi.sendFriendRequest(friendOnlineId, user?.token!!);
      
      if (response.success) {
        alert(`Friend request sent successfully to ${response.content?.viewModel?.receiver.username}!`);
        setFriendOnlineId("");
        setError("");
      } else {
        setError(response.message || "Error sending friend request");
      }
    } catch (err) {
      console.error("Request error:", err);
      setError("An error occurred while sending the request.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSendRequest} className="">
        <input
          type="text"
          placeholder="Enter Online ID"
          value={friendOnlineId}
          onChange={(e) => setFriendOnlineId(e.target.value)}
          className=""
        />
        <button
          type="submit"
          className=""
        >
          Send Friend Request
        </button>
      </form>

      {error && (
        <div className="">
          {error}
        </div>
      )}
    </div>
  );
};

export default SendFriendRequest;
