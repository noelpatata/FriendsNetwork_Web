import { friendApi } from "../adapters/api/friendApi";
import { UserDTO } from "../domain/models/UserDTO";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
const FriendList = () => {
    const { usertoken } = useAuth();
    const [friends, setFriends] = useState<UserDTO[]>([]);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchFriends = async () => {
    
          try {
            const { response } = await friendApi.getFriends(usertoken!!);
    
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
            const res = await friendApi.deleteFriend(usertoken!!, friendId);
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

      const handleStartChat = async (friend: UserDTO) => {

      }

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
            </>
      );
    };
    
    export default FriendList;