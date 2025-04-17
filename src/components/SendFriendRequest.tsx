import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const SendFriendRequest = () => {
  const { usertoken } = useAuth();
  const [friendOnlineId, setFriendOnlineId] = useState("");
  const [error, setError] = useState("");

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!friendOnlineId) {
      setError("Please provide a valid Online ID.");
      return;
    }

    try {
      const response = await fetch("https://192.168.1.141:5041/api/friendrequest/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usertoken}`, // Assuming you store JWT in context
        },
        body: JSON.stringify({ OnlineId: friendOnlineId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Friend request sent successfully!");
      } else {
        setError(data.message || "Error sending friend request");
      }
    } catch (err) {
      console.error("Request error:", err);
      setError("An error occurred while sending the request.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSendRequest} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter Online ID"
          value={friendOnlineId}
          onChange={(e) => setFriendOnlineId(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Friend Request
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default SendFriendRequest;
