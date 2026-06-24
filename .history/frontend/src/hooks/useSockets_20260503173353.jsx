import { useEffect, useRef } from "react";

export default function useSocket(onMessage) {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onmessage = (event) => {
      onMessage(event.data);
    };

    return () => ws.current.close();
  }, []);

  return ws;
}