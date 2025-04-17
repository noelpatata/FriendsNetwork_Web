import { useAuth } from "../AuthContext";
import FriendList from "../components/FriendList";
import SendFriendRequest from "../components/SendFriendRequest";
import FriendRequests from "../components/FriendRequests";

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
      logout()
  };

  return (
    <div className="">
      
      <FriendList />
      <SendFriendRequest />
      <FriendRequests />

      <button
          onClick={handleLogout}
          className=""
        >
          LogOut
        </button>
    </div>
  );
};

export default Home;
