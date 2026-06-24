import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  const ws = useRef(null);
  const hasSentUsername = useRef(false);

  const registerUsername = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      return;
    }

    if (hasSentUsername.current) {
      return;
    }

    ws.current.send(trimmedUsername);
    hasSentUsername.current = true;
  };

  // 🔥 Connect WebSocket
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      setStatus("Connected");
      console.log("Connected to server");
      registerUsername();
    };

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onclose = () => {
      setStatus("Disconnected");
      hasSentUsername.current = false;
      console.log("Disconnected");
    };

    ws.current.onerror = () => {
      setStatus("Error");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  // 🔥 Send Message
  const handleSend = () => {
    if (!username || !receiver || !message) return;

    registerUsername();

    if (!hasSentUsername.current) return;

    // private message format
    ws.current.send(`${receiver}:${message}`);

    setMessage("");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-2xl mb-4">Talkify Private Chat</h1>
      <p className="text-sm text-gray-400 mb-4">Status: {status}</p>

      {/* Username */}
      <input
        placeholder="Your username"
        className="p-2 mb-2 text-black w-64"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={registerUsername}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            registerUsername();
          }
        }}
      />

      {/* Receiver */}
      <input
        placeholder="Send to (username)"
        className="p-2 mb-2 text-black w-64"
        onChange={(e) => setReceiver(e.target.value)}
      />

      {/* Message */}
      <input
        placeholder="Enter message"
        value={message}
        className="p-2 mb-2 text-black w-64"
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Send
      </button>

      {/* Chat Box */}
      <div className="bg-gray-800 w-80 h-64 p-3 overflow-y-auto rounded">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="mb-1">
              {msg}
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;