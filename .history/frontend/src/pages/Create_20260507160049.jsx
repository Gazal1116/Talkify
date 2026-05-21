import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  Check,
  MessageCircleMore,
} from "lucide-react";

import Aurora from "../Aurora";

function Create() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  // Generate Room Code
  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Generate Button
  const handleGenerate = () => {
    if (!username) return;

    const code = generateRoomCode();

    setRoomCode(code);
  };

  // Copy Code
  const copyCode = async () => {
    await navigator.clipboard.writeText(roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Continue To Chat
  const joinChat = () => {
    navigate(`/chat/${roomCode}/${username}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Aurora Background */}
      <Aurora />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#16161d]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">

        {/* Top Icon */}
        <div className="flex justify-center mb-8">

          <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20">

            <MessageCircleMore
              size={42}
              className="text-white"
            />

          </div>

        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-center leading-7 mb-10 text-[15px]">
          Create secure realtime chat rooms and share the code instantly with your friends.
        </p>

        {!roomCode ? (
          <>
            {/* Username Input */}
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#101014] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-violet-500 transition-all mb-6"
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-white text-black hover:bg-gray-200 transition-all font-semibold py-4 rounded-2xl"
            >
              Generate Room
            </button>
          </>
        ) : (
          <div className="text-center">

            <p className="text-gray-500 mb-4 tracking-[3px] text-xs">
              ROOM CODE
            </p>

            {/* Room Code Box */}
            <div className="bg-[#101014] border border-white/10 rounded-3xl py-7 mb-6">

              <h2 className="text-5xl font-bold tracking-[10px] text-white">
                {roomCode}
              </h2>

            </div>

            {/* Copy Button */}
            <button
              onClick={copyCode}
              className="w-full mb-4 bg-[#202028] hover:bg-[#292933] transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-3"
            >

              {copied ? <Check size={20} /> : <Copy size={20} />}

              {copied ? "Copied!" : "Copy Code"}

            </button>

            {/* Continue Button */}
            <button
              onClick={joinChat}
              className="w-full bg-white text-black hover:bg-gray-200 transition-all font-semibold py-4 rounded-2xl"
            >
              Continue to Chat
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Create;