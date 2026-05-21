import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const makeCode = () => {
		// generate a short 6-char room code
		return Math.random().toString(36).slice(2, 8).toUpperCase();
	};

	const handleCreate = () => {
		if (!username) return;

		const code = makeCode();
		navigate(`/chat/${code}/${username}`);
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-black text-white">

			<h2 className="text-2xl mb-4">Create Chat</h2>

			<input
				placeholder="Enter username"
				className="p-2 mb-2 text-black"
				onChange={(e) => setUsername(e.target.value)}
			/>

			<button
				onClick={handleCreate}
				className="bg-blue-500 px-6 py-3 rounded"
			>
				Create & Join
			</button>

		</div>
	);
}

export default Create;
