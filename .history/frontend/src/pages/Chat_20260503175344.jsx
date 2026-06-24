import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Chat() {
  const { code, username } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      // join room with username
      ws.current.send(`join:${code}:${username}`);
    };

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (!message) return;

    ws.current.send(`${code}:${message}`);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">

      <div className="p-4 border-b border-gray-700">
        Room: {code} | User: {username}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            {msg}
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 text-black"
          placeholder="Type message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default Chat;