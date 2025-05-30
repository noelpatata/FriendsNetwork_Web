import { useState } from "react";
import { FriendDTO } from "../domain/models/Friends/FriendDTO";
import { useWebSocket } from "../hooks/useWebSocket";
import { useAuth } from "../AuthContext"; // Adjust path as needed

interface ChatProps {
  friend: FriendDTO;
  onClose: () => void;
}

const Chat = ({ friend, onClose }: ChatProps) => {
  const { user } = useAuth();
  const token = user?.token ?? null;  // adapt based on your LoginDTO token field

  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { sendMessage } = useWebSocket(token, (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "message" && data.fromUsername && data.message) {
        setMessages((prev) => [...prev, `${data.fromUsername}: ${data.message}`]);
      }
    } catch {
      // Ignore malformed messages
    }
  });

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;

    setMessages((prev) => [...prev, `Me: ${newMessage}`]);

    const outgoing = JSON.stringify({
      type: "message",
      receiverOnlineId: friend.friend?.online_id,
      message: newMessage.trim(),
    });

    sendMessage(outgoing);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {friend.friend?.username}</h2>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chat-messages" style={{ maxHeight: 300, overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
