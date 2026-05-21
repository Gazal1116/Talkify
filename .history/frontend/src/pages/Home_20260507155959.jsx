import { useNavigate } from "react-router-dom";
import { MessageSquarePlus, Users } from "lucide-react";
import Backdrop from "../Backdrop";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <Backdrop />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Logo */}
        <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Talkify
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-center max-w-2xl text-lg leading-8 mb-16">
          Real-time room based conversations powered by WebSockets.
          Create private rooms, join instantly using secure codes,
          and experience futuristic chatting.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

          {/* Create Room */}
          <div
            onClick={() => navigate("/create")}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 hover:scale-105 transition-all duration-300 hover:border-blue-500"
          >

            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <MessageSquarePlus size={32} className="text-blue-400" />
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Create Room
            </h2>

            <p className="text-gray-400 leading-7">
              Generate a unique room code instantly and invite your friends or teammates for secure real-time conversations.
            </p>

          </div>

          {/* Join Room */}
          <div
            onClick={() => navigate("/join")}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 hover:scale-105 transition-all duration-300 hover:border-purple-500"
          >

            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Users size={32} className="text-purple-400" />
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Join Room
            </h2>

            <p className="text-gray-400 leading-7">
              Enter a room code and instantly connect with private or group conversations in a premium chat environment.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;