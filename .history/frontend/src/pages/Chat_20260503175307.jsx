import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // 🔥 generate random code
  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreate = () => {
    if (!username) return;

    const code = generateCode();
    navigate(`/chat/${code}/${username}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h2 className="text-2xl mb-4">Create Chat</h2>

      <input
        placeholder="Enter username"
        className="p-2 mb-4 text-black"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-500 px-6 py-2 rounded"
      >
        Generate Code & Start
      </button>

    </div>
  );
}

export default Create;