// components/Chat.tsx
import { useState } from "react";
import { FriendDTO } from "../domain/models/Friends/FriendDTO";

interface ChatProps {
  friend: FriendDTO;
  onClose: () => void;
}

const Chat = ({ friend, onClose }: ChatProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, `Me: ${newMessage}`]);
    setNewMessage("");
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <h2 className="">Chat with {friend.friend?.username}</h2>
          <button onClick={onClose} className="">✖</button>
        </div>
        <div className="">
          {messages.map((msg, index) => (
            <div key={index} className="">{msg}</div>
          ))}
        </div>
        <div className="">
          <input
            className=""
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSend} className="">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
