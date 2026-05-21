import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, username }) {
  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="empty-state">
          No messages yet. Enter your username, choose a receiver, and send a message.
        </div>
      ) : (
        messages.map((msg, i) => {
          const isMe = msg.startsWith(username + ":") || msg.startsWith("To ");
          return <MessageBubble key={i} msg={msg} isMe={isMe} />;
        })
      )}
    </div>
  );
}

export default ChatWindow;