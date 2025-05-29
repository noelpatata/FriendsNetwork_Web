import { useEffect, useRef } from "react";
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export function useWebSocket(token: string | null, onMessage: (msg: string) => void) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        console.log("attempting to connect to WebSocket with token:", token);
        if (!token) return;

        const ws = new WebSocket(`${WS_BASE_URL}/ws?token=${token}`);
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

        return () => {
            ws.close();
        };
    }, [token]);
}
