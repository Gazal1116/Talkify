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

  const ws = useSocket((msg) => {
    setMessages((prev) => [...prev, msg]);
  });

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
        onSend={handleSend}
      />

    </div>
  );
}

export default ChatPage;