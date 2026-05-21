import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Spotlight } from "../Spotlight";

function Create() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // generate random room code
  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreate = () => {
    if (!username) return;

    const roomCode = generateCode();

    navigate(`/chat/${roomCode}/${username}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6">

      {/* Background */}
      <Spotlight />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
          <Sparkles className="text-purple-400" size={32} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4">
          Create Room
        </h1>

        <p className="text-gray-400 mb-10 leading-7">
          Start a private real-time conversation and invite others using a secure room code.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all mb-6"
        />

        {/* Button */}
        <button
          onClick={handleCreate}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold text-lg hover:scale-[1.02] transition-all duration-300"
        >
          Generate Room & Continue
        </button>

      </div>
    </div>
  );
}

export default Create;