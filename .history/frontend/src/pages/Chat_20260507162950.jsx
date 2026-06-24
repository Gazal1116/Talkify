import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizonal } from "lucide-react";

import Aurora from "../Aurora";

function Chat() {
  const { roomCode, username } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // CONNECT WEBSOCKET
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

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // SEND MESSAGE
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
    <div className="h-screen bg-[#0b0b0f] text-white flex flex-col relative overflow-hidden">

      {/* Background */}
      <Aurora />

      {/* Header */}
      <div className="relative z-10 px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-[#121217]/70 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-semibold tracking-wide">
            Room {roomCode}
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Logged in as {username}
          </p>

        </div>

        {/* Online Dot */}
        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <p className="text-sm text-gray-400">
            Connected
          </p>

        </div>

      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">

        <div className="max-w-4xl mx-auto space-y-5">

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
                  className={`max-w-[75%] px-5 py-4 rounded-[28px] ${
                    isOwn
                      ? "bg-white text-black rounded-br-md"
                      : "bg-[#17171d] border border-white/10 rounded-bl-md"
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

          <div ref={messagesEndRef} />

        </div>

      </div>

      {/* Input */}
      <div className="relative z-10 px-6 pb-6 pt-4 border-t border-white/10 bg-[#121217]/70 backdrop-blur-xl">

        <div className="max-w-4xl mx-auto flex items-center gap-4 bg-[#17171d] border border-white/10 rounded-full px-6 py-3">

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
            className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-all"
          >

            <SendHorizonal size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;