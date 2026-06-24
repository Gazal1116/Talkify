import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  const ws = useRef(null);
  const hasSentUsername = useRef(false);
  const pendingMessage = useRef(null);

  const sendChatMessage = (name, text) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    if (!hasSentUsername.current) {
      ws.current.send(name);
      hasSentUsername.current = true;
    }

    ws.current.send(text);
  };

  const connectSocket = () => {
    const socket = new WebSocket("ws://localhost:8000");
    ws.current = socket;
    setStatus("Connecting...");

    socket.onopen = () => {
      setStatus("Connected");

      if (pendingMessage.current) {
        const { name, text } = pendingMessage.current;
        sendChatMessage(name, text);
        pendingMessage.current = null;
      }
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      setStatus("Disconnected");
      hasSentUsername.current = false;
    };

    socket.onerror = () => {
      setStatus("Connection error");
    };
  };

  // connect to backend
  useEffect(() => {
    connectSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // send message
  const handleSend = () => {
    const trimmedMessage = message.trim();
    const trimmedUsername = username.trim();

    if (!trimmedMessage || !trimmedUsername) return;

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      pendingMessage.current = { name: trimmedUsername, text: trimmedMessage };

      if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
        connectSocket();
      }

      setMessage("");
      return;
    }

    sendChatMessage(trimmedUsername, trimmedMessage);

    setMessage("");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-2xl mb-4">Talkify Chat</h1>
      <p className="mb-3 text-sm text-gray-300">Status: {status}</p>

      {/* Username */}
      <input
        placeholder="Enter username"
        className="p-2 mb-2 text-black"
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Message */}
      <input
        placeholder="Enter message"
        value={message}
        className="p-2 mb-2 text-black"
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Button */}
      <button
        type="button"
        onClick={handleSend}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Send
      </button>

      {/* Chat Box */}
      <div className="bg-gray-800 w-80 h-60 p-3 overflow-y-auto rounded">
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

    </div>
  );
}

export default App;