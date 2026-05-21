import { MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[120px]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Talkify
        </h1>

        <p className="text-gray-400 text-center max-w-xl mb-12 text-lg">
          Real-time private and group conversations powered by WebSockets.
          Fast. Secure. Beautiful.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">

          {/* Create Card */}
          <div
            onClick={() => navigate("/create")}
            className="cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300 hover:border-blue-500"
          >
            <MessageSquare size={50} className="mb-6 text-blue-400" />

            <h2 className="text-3xl font-semibold mb-4">
              Create Chat
            </h2>

            <p className="text-gray-400">
              Start a new private or group room and invite others instantly using a secure room code.
            </p>
          </div>

          {/* Join Card */}
          <div
            onClick={() => navigate("/join")}
            className="cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300 hover:border-purple-500"
          >
            <Users size={50} className="mb-6 text-purple-400" />

            <h2 className="text-3xl font-semibold mb-4">
              Join Chat
            </h2>

            <p className="text-gray-400">
              Enter a room code and connect with friends, teams, or communities in real time.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;