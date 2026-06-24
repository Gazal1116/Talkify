import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";
import Aurora from "../Aurora";

function Chat() {
  const { roomCode, sessionId, username } = useParams();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // ✅ CONNECT WEBSOCKET (FIXED)
  useEffect(() => {
    const wsUrl =
      window.location.hostname === "localhost"
        ? "ws://localhost:8000"
        : "wss://talkify-oo6c.onrender.com";

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");

      const joinData = {
        type: "join",
        room: roomCode,
        username,
      };

      if (sessionId !== "existing") {
        joinData.sessionId = sessionId;
      }

      ws.current.send(JSON.stringify(joinData));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Message received:", data);

      if (data.type === "userlist") {
        setUsers(data.users || []);
        return;
      }

      setMessages((prev) => [...prev, data]);
    };

    ws.current.onerror = (error) => {
      console.log("❌ WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("⚠️ WebSocket disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, [roomCode, sessionId, username]);

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.log("❌ WebSocket not ready:", ws.current?.readyState);
      return;
    }

    const messageData = {
      type: "message",
      room: roomCode,
      username,
      text: message,
    };

    if (sessionId !== "existing") {
      messageData.sessionId = sessionId;
    }

    ws.current.send(JSON.stringify(messageData));
    setMessage("");
  };

  // ✅ ENTER KEY SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-[#0b0b0f] text-white flex flex-col relative overflow-hidden">
      <Aurora />

      {/* HEADER */}
      <div className="relative z-10 px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-[#121217]/70 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Room {roomCode}</h1>
          <p className="text-sm text-gray-400">Logged in as {username}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400">Connected</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex px-6 py-6 gap-6">
        {/* USERS */}
        <aside className="w-60 hidden md:block">
          <div className="bg-[#111] p-4 rounded-xl">
            <h3 className="text-sm text-gray-400 mb-3">Users</h3>
            {users.map((u, i) => (
              <p key={i} className="text-sm mb-2">
                {u}
              </p>
            ))}
          </div>
        </aside>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, i) => {
            const isOwn = msg.username === username;

            return (
              <div
                key={i}
                className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs ${
                    isOwn ? "bg-white text-black" : "bg-[#1a1a1a]"
                  }`}
                >
                  <p className="text-xs font-bold">{msg.username}</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type message..."
          className="flex-1 bg-[#1a1a1a] px-4 py-2 rounded-full outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-white text-black px-4 rounded-full"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

export default Chat;