import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Hash } from "lucide-react";

import Aurora from "../Aurora";

function Join() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  // Generate unique session ID
  const generateSessionId = () => {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  };

  const handleJoin = () => {
    if (!username || !roomCode) return;

    const sessionId = generateSessionId();
    navigate(`/chat/${roomCode}/${sessionId}/${username}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background */}
      <Aurora />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#16161d]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">

        {/* Icon */}
        <div className="flex justify-center mb-8">

          <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

            <LogIn
              size={42}
              className="text-white"
            />

          </div>

        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-center leading-7 mb-10 text-[15px]">
          Join an existing realtime room instantly using a secure room code.
        </p>

        {/* Username */}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-[#101014] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-violet-500 transition-all mb-5"
        />

        {/* Room Code */}
        <div className="relative mb-6">

          <Hash
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full bg-[#101014] border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white tracking-[3px] uppercase outline-none focus:border-violet-500 transition-all"
          />

        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          className="w-full bg-white text-black hover:bg-gray-200 transition-all font-semibold py-4 rounded-2xl"
        >
          Join Room
        </button>

      </div>

    </div>
  );
}

export default Join;