import { useEffect, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

type Props = {
  token: string;
};

export function NotificationListener({ token }: Props) {
  const [shouldConnect, setShouldConnect] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Slight delay before allowing connection
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldConnect(true);
    }, 500); // Wait 0.5 sec

    return () => clearTimeout(timeout);
  }, []);

  useWebSocket(shouldConnect ? token : null, (message: string) => {
    setNotifications((prev) => [...prev, message]);
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
