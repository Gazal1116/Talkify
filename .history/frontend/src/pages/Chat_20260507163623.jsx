import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";

import Aurora from "../Aurora";

function Chat() {
  const { roomCode, username } = useParams();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
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

      // server broadcasts user lists with type 'userlist'
      if (data.type === "userlist") {
        setUsers(data.users || []);
        return;
      }

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

    // Press Enter to send, Shift+Enter to insert a newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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
                      ? "bg-white text-black rounded-br-md shadow-lg"
                      : "bg-[#17171d] border border-white/10 rounded-bl-md shadow-inner"
                  }`}
                >

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xs font-semibold">
                      {msg.username?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <p className={`text-xs mb-0 font-medium ${isOwn ? "text-gray-600" : "text-violet-400"}`}>
                      {msg.username}
                    </p>
                  </div>

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

          <textarea
            rows={1}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 resize-none leading-6 py-1"
          />

          <button
            onClick={sendMessage}
            className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-all"
          >

            <SendHorizontal size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;