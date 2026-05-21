function MessageBubble({ msg, isMe }) {
  return (
    <div className={`message-row ${isMe ? "message-row--me" : "message-row--them"}`}>
      <div className={`message-bubble ${isMe ? "message-bubble--me" : "message-bubble--them"}`}>
        {msg}
      </div>
    </div>
  );
}

export default MessageBubble;