import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreate = () => {
    if (!username) return;

    const roomCode = generateRoomCode();

    navigate(`/chat/${roomCode}/${username}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* Logo */}
        <h1 className="text-5xl font-bold text-white text-center mb-3">
          Talkify
        </h1>

        <p className="text-gray-400 text-center mb-10 leading-7">
          Create a private realtime chat room and start conversations instantly.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-[#111113] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-violet-500 transition-all mb-6"
        />

        {/* Button */}
        <button
          onClick={handleCreate}
          className="w-full bg-violet-600 hover:bg-violet-500 transition-all text-white font-semibold py-4 rounded-2xl"
        >
          Create Room
        </button>

      </div>

    </div>
  );
}

export default Create;