import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { FriendRequestDTO } from "../domain/models/FriendRequestDTO";
import { friendRequestApi } from "../adapters/api/friendRequestApi"; // Adapter implementation

const FriendRequests = () => {
  const { usertoken } = useAuth();
  const [friendRequests, setFriendRequests] = useState<FriendRequestDTO[]>([]);
  const [error, setError] = useState<string>("");

  const fetchFriendRequests = async () => {
    if (!usertoken) return;

    try {
      const { response } = await friendRequestApi.getFriendRequests(usertoken.token);

      if (!response.success) {
        setError(response.message || "Failed to fetch friend requests");
        return;
      }

      setFriendRequests(response.content || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching friend requests.");
    }
  };

  const handleAcceptRequest = async (onlineId: string) => {
    try {
      const { response } = await friendRequestApi.acceptFriendRequest(onlineId, usertoken?.token!!);

      if (response.success) {
        setFriendRequests(prev => prev.filter(req => req.friend?.online_Id !== onlineId));
      } else {
        setError(response.message || "Failed to accept request.");
      }
    } catch (err) {
      console.error("Accept error:", err);
      setError("An error occurred while accepting the request.");
    }
  };

  const handleRejectRequest = async (onlineId: string) => {
    try {
      const { response } = await friendRequestApi.rejectFriendRequest(onlineId, usertoken?.token!!);

      if (response.success) {
        setFriendRequests(prev => prev.filter(req => req.friend?.online_Id !== onlineId));
      } else {
        setError(response.message || "Failed to reject request.");
      }
    } catch (err) {
      console.error("Reject error:", err);
      setError("An error occurred while rejecting the request.");
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, [usertoken]);

  return (
    <div className="">
      <h2 className="">Friend Requests</h2>

      {error && <div className="">{error}</div>}

      {friendRequests.length === 0 ? (
        <p>No friend requests.</p>
      ) : (
        <ul>
          {friendRequests.map((request, index) => (
            <li key={index} className="">
              <span>
                User: {request.friend?.username} | Sent at:{" "}
                {new Date(request.sentAt).toLocaleString()}
              </span>
              <div className="">
                <button
                  onClick={() => handleAcceptRequest(request.friend?.online_Id ?? "")}
                  className=""
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(request.friend?.online_Id ?? "")}
                  className=""
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
