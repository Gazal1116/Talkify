import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="text-3xl mb-6">Talkify</h1>

      <button
        onClick={() => navigate("/create")}
        className="bg-blue-500 px-6 py-3 rounded mb-4"
      >
        Create Chat
      </button>

      <button
        onClick={() => navigate("/join")}
        className="bg-green-500 px-6 py-3 rounded"
      >
        Join Chat
      </button>

    </div>
  );
}

export default Home;