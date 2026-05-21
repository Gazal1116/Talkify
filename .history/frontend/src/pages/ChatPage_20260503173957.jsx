import { useState, useRef } from "react";
import useSocket from "../hooks/useSockets";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const hasSentUsername = useRef(false);
  const lastRegisteredUsername = useRef("");

  const ws = useSocket((msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  const registerUsername = () => {
    const trimmedUsername = username.trim();

    if (
      !trimmedUsername ||
      !ws.current ||
      ws.current.readyState !== WebSocket.OPEN ||
      lastRegisteredUsername.current === trimmedUsername
    ) {
      return;
    }

    ws.current.send(trimmedUsername);
    hasSentUsername.current = true;
    lastRegisteredUsername.current = trimmedUsername;
  };

  const handleSend = () => {
    if (!username || !receiver || !message) return;

    registerUsername();

    ws.current.send(`${receiver}:${message}`);
    setMessage("");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="app-title">Talkify Pro</div>
          <div className="app-subtitle">Private chat between connected users</div>
        </div>
        <div className="app-status">Live</div>
      </header>

      <ChatWindow messages={messages} username={username} />

      <ChatInput
        username={username}
        setUsername={setUsername}
        receiver={receiver}
        setReceiver={setReceiver}
        message={message}
        setMessage={setMessage}
        onRegisterUsername={registerUsername}
        onSend={handleSend}
      />

    </div>
  );
}

export default ChatPage;