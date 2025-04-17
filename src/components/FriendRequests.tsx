import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { FriendRequestDTO } from "../types/FriendRequestDTO"; // Import the DTO type

const FriendRequests = () => {
  const { usertoken } = useAuth();  // Assuming you store the JWT in AuthContext
  const [friendRequests, setFriendRequests] = useState<FriendRequestDTO[]>([]);
  const [error, setError] = useState<string>("");

  // Function to handle accepting a friend request
  const handleAcceptRequest = async (onlineId: string) => {
    try {
      const response = await fetch("https://192.168.1.141:5041/api/friendrequest/accept", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OnlineId: onlineId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh the friend requests after accepting
        setFriendRequests(friendRequests.filter((request) => request.friend?.online_Id !== onlineId));
      } else {
        setError(data.message || "Error accepting friend request");
      }
    } catch (err) {
      console.error("Request error:", err);
      setError("An error occurred while accepting the request.");
    }
  };

  // Function to handle rejecting a friend request
  const handleRejectRequest = async (onlineId: string) => {
    try {
      const response = await fetch("https://192.168.1.141:5041/api/friendrequest/reject", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OnlineId: onlineId }), // Send OnlineId in the request body
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the rejected request from the list
        setFriendRequests(friendRequests.filter((request) => request.friend?.online_Id !== onlineId));
      } else {
        setError(data.message || "Error rejecting friend request");
      }
    } catch (err) {
      console.error("Request error:", err);
      setError("An error occurred while rejecting the request.");
    }
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch("https://192.168.1.141:5041/api/friendrequest", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${usertoken}`, // Assuming JWT is stored in context
          },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Server error");
        }
        if( ! data.success ){
            throw new Error(data.message);
        }
        
        setFriendRequests(data.content || []);
          
        
      } catch (err) {
        console.error("Error fetching friend requests:", err);
        setError("An error occurred while fetching friend requests.");
      }
    };

    fetchFriendRequests();
  }, [usertoken]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {friendRequests.length === 0 ? (
        <p>No friend requests.</p>
      ) : (
        <ul>
          {friendRequests.map((request, index) => (
            <li key={index} className="flex items-center justify-between p-2 mb-2 border-b">
              <span>User: {request.friend?.username} Sent at: {new Date(request.sentAt).toLocaleString()} </span>
              <div className="space-x-4">
                <button
                  onClick={() => handleAcceptRequest(request.friend?.online_Id?.toString() || "")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(request.friend?.online_Id?.toString() || "")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;
