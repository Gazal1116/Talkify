import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ws = useRef(null);
  const hasSentUsername = useRef(false);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.current.close();
  }, []);

  const handleSend = () => {
    if (!username || !receiver || !message) return;

    if (!hasSentUsername.current) {
      ws.current.send(username);
      hasSentUsername.current = true;
    }

    ws.current.send(`${receiver}:${message}`);
    setMessage("");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 flex flex-col">

      {/* HEADER */}
      <div className="p-4 text-center text-white text-xl font-bold border-b border-gray-700">
        🚀 Talkify AI Chat
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => {
          const isMe = msg.startsWith(username + ":");
          return (
            <div
              key={i}
              className={`max-w-xs px-4 py-2 rounded-xl ${
                isMe
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg}
            </div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-black/40 backdrop-blur-md border-t border-gray-700">

        <div className="flex gap-2 mb-2">
          <input
            placeholder="Your name"
            className="flex-1 p-2 rounded bg-gray-800 text-white"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Send to"
            className="flex-1 p-2 rounded bg-gray-800 text-white"
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Type a message..."
            value={message}
            className="flex-1 p-3 rounded bg-gray-800 text-white"
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="px-6 py-3 rounded bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;