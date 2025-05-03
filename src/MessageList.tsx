type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function MessageList({ messages }: { messages: Message[] }) {
  return (

    <div className="space-y-3 flex flex-col">
      {messages.map((msg, i) => (
        <div
          className={`px-4 py-2 rounded-lg shadow w-fit break-words
    ${msg.role === 'user'
              ? 'bg-blue-100 self-end text-right'
              : 'bg-white self-start text-left border'}
  `}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
