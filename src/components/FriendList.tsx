import { friendApi } from "../adapters/api/friendApi";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Chat from "./Chat";
import { FriendDTO } from "../domain/models/Friends/FriendDTO";
const FriendList = () => {
    const { usertoken } = useAuth();
    const [friends, setFriends] = useState<FriendDTO[]>([]);
    const [error, setError] = useState("");
    const [selectedFriend, setSelectedFriend] = useState<FriendDTO | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
    
          try {
            const result = await friendApi.getFriends(usertoken?.token!!);
            const response = result?.response;

            if (!response) {
              setError("You've got no friends :(");
              return;
            }

            if (response.success) {
              if (!response.content?.viewModels) {
                return;
              }

              const friends = response.content.viewModels;
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
              setFriends(friends.filter((friend) => friend.Friend!!.Online_Id !== friendId));
            } else {
              setError(res.response.message || "Failed to delete friend");
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
                  <li key={friend!!.Friend?.Online_Id.toString()}>
                    <span>{friend!!.Friend?.Username}</span>
                    <button onClick={() => handleDeleteFriend(friend!!.Friend!!.Online_Id.toString())}>
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