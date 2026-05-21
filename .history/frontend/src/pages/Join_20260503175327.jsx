import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!username || !code) return;

    navigate(`/chat/${code}/${username}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h2 className="text-2xl mb-4">Join Chat</h2>

      <input
        placeholder="Enter username"
        className="p-2 mb-2 text-black"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Enter code"
        className="p-2 mb-4 text-black"
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={handleJoin}
        className="bg-green-500 px-6 py-2 rounded"
      >
        Join
      </button>

    </div>
  );
}

export default Join;