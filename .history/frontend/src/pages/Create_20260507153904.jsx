import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Wifi, Users } from "lucide-react";

function Create() {
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(124);
  const navigate = useNavigate();

  // fake realtime counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 3 - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    if (!username) return;

    const roomCode = generateRoomCode();

    navigate(`/chat/${roomCode}/${username}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7c3aed22,transparent_30%),radial-gradient(circle_at_bottom_right,#2563eb22,transparent_30%)]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* Floating Blur Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      {/* Main Layout */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-10 lg:px-24">

          {/* Status */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm tracking-widest uppercase">
              WebSocket Connected
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-8">

            TALK
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              IFY
            </span>

          </h1>

          <p className="text-gray-400 text-lg leading-8 max-w-xl mb-12">
            Create secure realtime chat rooms powered by WebSockets.
            Experience futuristic communication with lightning-fast messaging.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">

            <div className="border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-purple-400" size={20} />
                <p className="text-sm text-gray-400">Online Users</p>
              </div>

              <h2 className="text-3xl font-bold">
                {onlineUsers}+
              </h2>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="text-blue-400" size={20} />
                <p className="text-sm text-gray-400">Realtime Rooms</p>
              </div>

              <h2 className="text-3xl font-bold">
                52
              </h2>
            </div>

          </div>

          {/* Fake Live Feed */}
          <div className="mt-16 space-y-4 max-w-md">

            <div className="border border-white/10 bg-white/5 rounded-2xl px-5 py-4 backdrop-blur-md">
              <p className="text-sm text-gray-400 mb-1">
                ROOM CREATED
              </p>

              <p className="font-semibold">
                User Alex created room X7P21A
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-2xl px-5 py-4 backdrop-blur-md">
              <p className="text-sm text-gray-400 mb-1">
                USER JOINED
              </p>

              <p className="font-semibold">
                Sarah joined room CHAT09
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-8">

          <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8">

            {/* Top */}
            <div className="flex items-center gap-3 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Wifi />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Create Room
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Start a realtime private session
                </p>
              </div>

            </div>

            {/* Username */}
            <div className="mb-6">

              <label className="text-sm text-gray-400 block mb-3">
                USERNAME
              </label>

              <input
                type="text"
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
              />

            </div>

            {/* Button */}
            <button
              onClick={handleCreateRoom}
              className="group w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300"
            >

              Generate Room

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-all"
              />

            </button>

            {/* Bottom Text */}
            <p className="text-gray-500 text-sm text-center mt-6 leading-6">
              Your room code will be generated instantly and can be shared securely with others.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Create;