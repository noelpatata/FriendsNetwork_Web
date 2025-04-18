import { friendApi } from "../adapters/api/friendApi";
import { UserDTO } from "../domain/models/UserDTO";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Chat from "./Chat";
const FriendList = () => {
    const { usertoken } = useAuth();
    const [friends, setFriends] = useState<UserDTO[]>([]);
    const [error, setError] = useState("");
    const [selectedFriend, setSelectedFriend] = useState<UserDTO | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
    
          try {
            const { response } = await friendApi.getFriends(usertoken?.token!!);
    
            if (response.success) {
              const friends = response.content;
              setFriends(friends);
            } else {
              setError(response.message || "Failed to fetch friends");
            }
          } catch (err: any) {
            setError(err.message || "Something went wrong");
          }
        };
    
        fetchFriends();
      }, [usertoken]);

      const handleDeleteFriend = async (friendId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this friend?");
        if (confirmed) {
          try {
            const res = await friendApi.deleteFriend(usertoken?.token!!, friendId);
            if (res.response.success) {
              setFriends(friends.filter((friend) => friend!!.online_Id !== friendId));
            } else {
              setError(res.response.message || "Failed to delete friend");
            }
          } catch (err: any) {
            setError(err.message || "Something went wrong");
          }
        }
      };

      const handleStartChat = (friend: UserDTO) => {
        setSelectedFriend(friend);
      };

      return (
        <>
              <h1>My Friends</h1>
              {error && <p>{error}</p>}
              <ul>
                {friends.map((friend) => (
                  <li key={friend!!.online_Id.toString()}>
                    <span>{friend!!.username}</span>
                    <button onClick={() => handleDeleteFriend(friend!!.online_Id.toString())}>
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