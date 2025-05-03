type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-xs p-2 rounded-lg ${msg.role === 'user'
            ? 'bg-blue-100 self-end text-right ml-auto'
            : 'bg-gray-100 self-start text-left mr-auto'
            }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
