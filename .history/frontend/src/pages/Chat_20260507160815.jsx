import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";

import Aurora from "../Aurora";

function Chat() {
  const { roomCode, username } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ws = useRef(null);

  // CONNECT
  useEffect(() => {

    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {

      ws.current.send(
        JSON.stringify({
          type: "join",
          room: roomCode,
          username,
        })
      );

    };

    ws.current.onmessage = (event) => {

      const data = JSON.parse(event.data);

      setMessages((prev) => [...prev, data]);

    };

    return () => {
      ws.current.close();
    };

  }, [roomCode, username]);

  // SEND
  const sendMessage = () => {

    if (!message.trim()) return;

    ws.current.send(
      JSON.stringify({
        type: "message",
        room: roomCode,
        username,
        text: message,
      })
    );

    setMessage("");
  };

  // ENTER SEND
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }

  };

  return (
    <div className="h-screen bg-[#0d0d12] flex flex-col relative overflow-hidden text-white">

      <Aurora />

      {/* Top */}
      <div className="relative z-10 border-b border-white/10 bg-[#141419]/70 backdrop-blur-xl px-6 py-5 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Room {roomCode}
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Connected as {username}
          </p>

        </div>

      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-4">

        {messages.map((msg, index) => {

          const isOwn = msg.username === username;

          return (
            <div
              key={index}
              className={`flex ${
                isOwn
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] px-5 py-4 rounded-3xl ${
                  isOwn
                    ? "bg-white text-black rounded-br-md"
                    : "bg-[#1b1b23] border border-white/10 rounded-bl-md"
                }`}
              >

                {!isOwn && (
                  <p className="text-xs text-violet-400 mb-1">
                    {msg.username}
                  </p>
                )}

                <p className="leading-7">
                  {msg.text}
                </p>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom */}
      <div className="relative z-10 p-5 border-t border-white/10 bg-[#141419]/70 backdrop-blur-xl">

        <div className="flex items-center gap-4 bg-[#1b1b23] border border-white/10 rounded-2xl px-5 py-3">

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
          />

          <button
            onClick={sendMessage}
            className="bg-white text-black p-3 rounded-xl hover:bg-gray-200 transition-all"
          >

            <Send size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;