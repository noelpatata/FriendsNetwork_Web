import { friendApi } from "../adapters/api/friendApi";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Chat from "./Chat";
import { FriendDTO } from "../domain/models/Friends/FriendDTO";
const FriendList = () => {
    const { user } = useAuth();
    const [friends, setFriends] = useState<FriendDTO[]>([]);
    const [error, setError] = useState("");
    const [selectedFriend, setSelectedFriend] = useState<FriendDTO | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
    
          try {
            const response = await friendApi.getFriends(user?.token!!);

            if (!response) {
              setError("You've got no friends :(");
              return;
            }

            if (response.success) {
              if (!response.content?.viewModel) {
                return;
              }

              const friends = response.content.viewModel;
              setFriends(friends);
            } else {
              setError(response.message || "Failed to fetch friends");
            }
          } catch (err: any) {
            setError(err.message || "Something went wrong");
          }

        };
    
        fetchFriends();
      }, [user]);

      const handleDeleteFriend = async (friendId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this friend?");
        if (confirmed) {
          try {
            const res = await friendApi.deleteFriend(user?.token!!, friendId);
            if (res.success) {
              setFriends(friends.filter((friend) => friend.friend!!.online_id !== friendId));
            } else {
              setError(res.message || "Failed to delete friend");
            }
          } catch (err: any) {
            setError(err.message || "Something went wrong");
          }
        }
      };

      const handleStartChat = (friend: FriendDTO) => {
        setSelectedFriend(friend);
      };

      return (
        <>
              <h1>My Friends</h1>
              {error && <p>{error}</p>}
              <ul>
                {friends.map((friend) => (
                  <li key={friend!!.friend?.online_id.toString()}>
                    <span>{friend!!.friend?.username}</span>
                    <button onClick={() => handleDeleteFriend(friend!!.friend!!.online_id.toString())}>
                      Delete
                    </button>
                    <button onClick={() => handleStartChat(friend)}>
                      Start Chat
                    </button>
                  </li>
                ))}
              </ul>
              {selectedFriend && (
              <Chat
                friend={selectedFriend}
                onClose={() => setSelectedFriend(null)}
              />
            )}
            </>
      );
    };
    
    export default FriendList;