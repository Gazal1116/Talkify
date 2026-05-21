import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check } from "lucide-react";

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
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* Logo */}
        <h1 className="text-5xl font-bold text-white text-center mb-3">
          Talkify
        </h1>

        <p className="text-gray-400 text-center mb-10 leading-7">
          Create secure realtime chat rooms instantly.
        </p>

        {!roomCode ? (
          <>
            {/* Username Input */}
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-violet-500 transition-all mb-6"
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-violet-600 hover:bg-violet-500 transition-all text-white font-semibold py-4 rounded-2xl"
            >
              Generate Room
            </button>
          </>
        ) : (
          <div className="text-center">

            <p className="text-gray-400 mb-4">
              ROOM CREATED
            </p>

            {/* Room Code */}
            <div className="bg-[#111113] border border-violet-500/30 rounded-2xl py-6 mb-6">

              <h2 className="text-5xl font-bold tracking-[10px] text-violet-400">
                {roomCode}
              </h2>

            </div>

            {/* Copy Button */}
            <button
              onClick={copyCode}
              className="w-full mb-4 bg-[#232326] hover:bg-[#2a2a2e] transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-3"
            >

              {copied ? <Check size={20} /> : <Copy size={20} />}

              {copied ? "Copied!" : "Copy Room Code"}

            </button>

            {/* Join Chat */}
            <button
              onClick={joinChat}
              className="w-full bg-violet-600 hover:bg-violet-500 transition-all text-white font-semibold py-4 rounded-2xl"
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