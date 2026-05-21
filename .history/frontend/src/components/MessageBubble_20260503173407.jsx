function MessageBubble({ msg, isMe }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs ${
          isMe
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {msg}
      </div>
    </div>
  );
}

export default MessageBubble;