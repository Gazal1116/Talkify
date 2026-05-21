import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";

import PremiumBg from "../components/PremiumBg";

function Chat() {
  const { roomCode, username } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ws = useRef(null);
  const bottomRef = useRef(null);

  // CONNECT
  useEffect(() => {

    ws.current = new WebSocket("ws://localhost:5000");

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

  // AUTO SCROLL
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

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
    <div className="h-screen bg-[#07070a] text-white relative overflow-hidden flex flex-col">

      <PremiumBg />

      {/* Header */}
      <div className="relative z-10 px-8 py-5 border-b border-white/10 backdrop-blur-2xl bg-white/[0.03] flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-semibold tracking-wide">
            Room {roomCode}
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Logged in as {username}
          </p>

        </div>

        {/* Connected */}
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full">

          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />

          <p className="text-sm text-gray-300">
            Connected
          </p>

        </div>

      </div>

      {/* Chat Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">

        <div className="max-w-5xl mx-auto space-y-6">

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
                  className={`max-w-[70%] px-6 py-4 backdrop-blur-xl border rounded-[28px] ${
                    isOwn
                      ? "bg-white text-black border-white/20 rounded-br-md"
                      : "bg-white/[0.05] border-white/10 text-white rounded-bl-md"
                  }`}
                >

                  {!isOwn && (
                    <p className="text-xs text-violet-400 mb-2 font-medium">
                      {msg.username}
                    </p>
                  )}

                  <p className="leading-7 text-[15px]">
                    {msg.text}
                  </p>

                </div>

              </div>
            );
          })}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* Bottom Input */}
      <div className="relative z-10 px-6 pb-6 pt-4">

        <div className="max-w-5xl mx-auto bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-[28px] px-6 py-4 flex items-center gap-4 shadow-2xl">

          <input
            type="text"
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 text-[15px]"
          />

          <button
            onClick={sendMessage}
            className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 transition-all"
          >

            <SendHorizontal size={20} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;