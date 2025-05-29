import { useAuth } from "../AuthContext";
import FriendList from "../components/FriendList";
import SendFriendRequest from "../components/SendFriendRequest";
import FriendRequests from "../components/FriendRequests";
import { NotificationListener } from "../components/NotificationListener";

const Home = () => {
  const { user, logout, ready } = useAuth();
  
  const handleLogout = async () => {
      logout()
  };

  return (
    <div className="">
      {ready && user && <NotificationListener token={user.token} />}      <FriendList />
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
