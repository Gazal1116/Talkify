import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizonal } from "lucide-react";

import Aurora from "../Aurora";

function Chat() {
  const { roomCode, username } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ws = useRef(null);
  const bottomRef = useRef(null);

  // connect websocket
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      console.log("Connected");

      ws.current.send(
        JSON.stringify({
          type: "join",
          room: roomCode,
          username: username,
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

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      type: "message",
      room: roomCode,
      username,
      text: message,
    };

    ws.current.send(JSON.stringify(data));

    setMessage("");
  };

  // ENTER key send
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-[#0d0d12] text-white flex relative overflow-hidden">

      {/* Background */}
      <Aurora />

      {/* Sidebar */}
      <div className="hidden md:flex w-[280px] border-r border-white/10 bg-[#13131a]/80 backdrop-blur-xl flex-col p-6 relative z-10">

        <h1 className="text-3xl font-bold mb-10">
          Talkify
        </h1>

        {/* Room */}
        <div className="bg-[#1a1a22] border border-white/10 rounded-2xl p-5 mb-6">

          <p className="text-gray-400 text-sm mb-2">
            ROOM CODE
          </p>

          <h2 className="text-2xl font-bold tracking-[5px]">
            {roomCode}
          </h2>

        </div>

        {/* User */}
        <div className="bg-[#1a1a22] border border-white/10 rounded-2xl p-5">

          <p className="text-gray-400 text-sm mb-2">
            CONNECTED AS
          </p>

          <h2 className="text-xl font-semibold">
            {username}
          </h2>

        </div>

      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Top */}
        <div className="h-20 border-b border-white/10 bg-[#13131a]/70 backdrop-blur-xl flex items-center justify-between px-6">

          <div>
            <h2 className="text-xl font-semibold">
              Realtime Chat
            </h2>

            <p className="text-gray-400 text-sm">
              Room {roomCode}
            </p>
          </div>

        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

          {messages.map((msg, index) => {

            const isOwn = msg.username === username;

            return (
              <div
                key={index}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-3xl px-5 py-4 ${
                    isOwn
                      ? "bg-white text-black"
                      : "bg-[#1b1b23] border border-white/10 text-white"
                  }`}
                >

                  {!isOwn && (
                    <p className="text-xs text-violet-400 mb-2">
                      {msg.username}
                    </p>
                  )}

                  <p className="break-words">
                    {msg.text}
                  </p>

                </div>

              </div>
            );
          })}

          <div ref={bottomRef} />

        </div>

        {/* Input */}
        <div className="p-5 border-t border-white/10 bg-[#13131a]/70 backdrop-blur-xl">

          <div className="flex items-center gap-4 bg-[#1a1a22] border border-white/10 rounded-2xl px-5 py-3">

            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
            />

            <button
              onClick={sendMessage}
              className="bg-white text-black p-3 rounded-xl hover:bg-gray-200 transition-all"
            >
              <SendHorizonal size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Chat;