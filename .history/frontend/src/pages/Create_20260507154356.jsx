import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, MessageCircleMore } from "lucide-react";

function Create() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleGenerate = () => {
    if (!username) return;

    const code = generateRoomCode();

    setRoomCode(code);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const joinChat = () => {
    navigate(`/chat/${roomCode}/${username}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-violet-600/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-5">

            <MessageCircleMore size={38} className="text-white" />

          </div>

          <h1 className="text-5xl font-bold text-white">
            Talkify
          </h1>

          <p className="text-gray-400 text-center mt-3 leading-7">
            Create secure realtime chat rooms instantly and connect with anyone.
          </p>

        </div>

        {!roomCode ? (
          <>
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
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-all text-white font-semibold py-4 rounded-2xl shadow-lg shadow-violet-500/20"
            >
              Generate Room
            </button>
          </>
        ) : (
          <div className="text-center">

            <p className="text-gray-400 mb-4 tracking-[3px] text-sm">
              ROOM CREATED
            </p>

            {/* Code Box */}
            <div className="bg-[#111113] border border-violet-500/20 rounded-3xl py-7 mb-6 shadow-inner">

              <h2 className="text-5xl font-bold tracking-[12px] text-white">
                {roomCode}
              </h2>

            </div>

            {/* Copy Button */}
            <button
              onClick={copyCode}
              className="w-full mb-4 bg-[#1a1a1f] hover:bg-[#232329] transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-3"
            >

              {copied ? <Check size={20} /> : <Copy size={20} />}

              {copied ? "Copied!" : "Copy Room Code"}

            </button>

            {/* Join Chat */}
            <button
              onClick={joinChat}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-all text-white font-semibold py-4 rounded-2xl shadow-lg shadow-violet-500/20"
            >
              Join Chat
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Create;