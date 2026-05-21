import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, username }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, i) => {
        const isMe = msg.startsWith(username + ":");
        return <MessageBubble key={i} msg={msg} isMe={isMe} />;
      })}
    </div>
  );
}

export default ChatWindow;