function ChatInput({
  username,
  setUsername,
  receiver,
  setReceiver,
  message,
  setMessage,
  onSend,
}) {
  return (
    <div className="p-4 bg-black/40 backdrop-blur-md border-t border-gray-700">

      <div className="flex gap-2 mb-2">
        <input
          placeholder="Your name"
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Send to"
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <input
          placeholder="Type message..."
          value={message}
          className="flex-1 p-3 rounded bg-gray-800 text-white"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={onSend}
          className="px-6 py-3 rounded bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default ChatInput;