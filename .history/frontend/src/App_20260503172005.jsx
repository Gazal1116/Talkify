import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-2xl mb-4">Test UI</h1>

      <input
        placeholder="Your username"
        className="p-2 mb-2 text-black"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Send to (username)"
        className="p-2 mb-2 text-black"
        onChange={(e) => setReceiver(e.target.value)}
      />

      <input
        placeholder="Enter message"
        className="p-2 mb-2 text-black"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="bg-blue-500 px-4 py-2 rounded">
        Send
      </button>

    </div>
  );
}

export default App;