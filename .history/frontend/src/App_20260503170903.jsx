import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ws = useRef(null);
  const hasSentUsername = useRef(false);

  // connect to backend
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      console.log("Connected to server");
    };

    ws.current.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onclose = () => {
      console.log("Disconnected");
    };
  }, []);

  // send message
  const handleSend = () => {
    if (!message || !username) return;

    // send username ONLY once
    if (!hasSentUsername.current) {
      ws.current.send(username);
      hasSentUsername.current = true;
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