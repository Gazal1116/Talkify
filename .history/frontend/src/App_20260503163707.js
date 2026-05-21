import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="text-2xl mb-4">Talkify Chat</h1>

      {/* Username */}
      <input
        placeholder="Enter username"
        className="p-2 mb-3 text-black"
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Message */}
      <input
        placeholder="Enter message"
        className="p-2 mb-3 text-black"
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Button */}
      <button className="bg-blue-500 px-4 py-2 rounded">
        Send
      </button>

    </div>
  );
}

export default App;