import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ws = useRef(null);

  // connect to backend
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  // send message
  const handleSend = () => {
    if (!message) return;

    // first send username (only once)
    if (ws.current && ws.current.readyState === 1 && username) {
      ws.current.send(username);
    }

    // send actual message
    ws.current.send(message);

    setMessage("");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-2xl mb-4">Talkify Chat</h1>

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