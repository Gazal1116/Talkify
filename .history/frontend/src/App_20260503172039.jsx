import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  const ws = useRef(null);
  const hasSentUsername = useRef(false);

  // 🔥 connect websocket
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      setStatus("Connected");
    };

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onclose = () => {
      setStatus("Disconnected");
      hasSentUsername.current = false;
    };

    return () => {
      ws.current.close();
    };
  }, []);

  // 🔥 send message
  const handleSend = () => {
    if (!username || !receiver || !message) return;

    // send username only once
    if (!hasSentUsername.current) {
      ws.current.send(username);
      hasSentUsername.current = true;
    }

    // private message format
    ws.current.send(`${receiver}:${message}`);

    setMessage("");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-2xl mb-4">Talkify Private Chat</h1>
      <p className="mb-3 text-sm text-gray-400">Status: {status}</p>

      {/* Username */}
      <input
        placeholder="Your username"
        className="p-2 mb-2 text-black w-60"
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Receiver */}
      <input
        placeholder="Send to (username)"
        className="p-2 mb-2 text-black w-60"
        onChange={(e) => setReceiver(e.target.value)}
      />

      {/* Message */}
      <input
        placeholder="Enter message"
        value={message}
        className="p-2 mb-2 text-black w-60"
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Button */}
      <button
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