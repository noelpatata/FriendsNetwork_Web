import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { UserDTO } from "../types/UserDTO";
import SendFriendRequest from "../components/SendFriendRequest";
import FriendRequests from "../components/FriendRequests";  // Adjust path as necessary

const Home = () => {
  const { usertoken } = useAuth();
  const [friends, setFriends] = useState<UserDTO[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch("https://192.168.1.141:5041/api/friend", {
          headers: {
            "Authorization": `Bearer ${usertoken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch friends");
        
        const data = await res.json();
        if (data.success) {
          // Handle response safely, extracting the 'friend' objects correctly
          const validFriends = data.content.map((item: any) => item.friend).filter((friend: any) => friend && friend.online_Id);
          setFriends(validFriends);
        } else {
          setError(data.message);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    if (usertoken) {
      fetchFriends();
    }
  }, [usertoken]);

  return (
    <div className="flex">
      <div className="w-2/3 p-4">
        <h1 className="text-2xl font-bold">My Friends</h1>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-4">
          {friends.map((friend) => (
            <li key={friend.online_Id.toString()}>{friend.username}</li>
          ))}
        </ul>
        <SendFriendRequest />
      </div>

      <div className="w-1/3 p-4 bg-gray-100">
        <FriendRequests />
      </div>
    </div>
  );
};

export default Home;
