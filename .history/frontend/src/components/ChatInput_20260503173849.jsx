function ChatInput({
  username,
  setUsername,
  receiver,
  setReceiver,
  message,
  setMessage,
  onRegisterUsername,
  onSend,
}) {
  return (
    <div className="chat-composer">
      <div className="composer-grid">
        <input
          placeholder="Your name"
          value={username}
          className="chat-field"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={onRegisterUsername}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRegisterUsername();
            }
          }}
        />

        <input
          placeholder="Send to"
          value={receiver}
          className="chat-field"
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>

      <div className="composer-row">
        <input
          placeholder="Type message..."
          value={message}
          className="chat-field chat-field--message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="button"
          onClick={onSend}
          className="chat-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;