import { useEffect, useRef } from "react";

export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export function useWebSocket(token: string | null, onMessage: (msg: string) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    const timeout = setTimeout(() => {
      const ws = new WebSocket(`${WS_BASE_URL}/ws?token=${encodeURIComponent(token)}`);
      socketRef.current = ws;

      ws.onmessage = (event) => {
        onMessage(event.data);
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [token]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket not connected");
    }
  };

  return { sendMessage };
}
