import { useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

type Props = {
  token: string;
};

export function NotificationListener({ token }: Props) {
  const [notifications, setNotifications] = useState<string[]>([]);

  useWebSocket(token, (message: string) => {
  try {
    const data = JSON.parse(message);
    if (data.type === "notification") {
      setNotifications((prev) => [...prev, `${data.fromUsername}: ${data.message}`]);
    }
  } catch (err) {
    console.error("Failed to parse WebSocket message:", err);
  }
});

  return (
    <div className="fixed top-4 right-4 bg-white shadow-md p-4 rounded-md w-80 z-50">
      <h4 className="font-bold mb-2">Notifications</h4>
      <ul>
        {notifications.map((n, idx) => (
          <li key={idx} className="text-sm text-gray-800 mb-1">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
