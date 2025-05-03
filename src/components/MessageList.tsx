import ChatMessage from './ChatMessage';
import type { Message } from '../types/message';

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-3 flex flex-col">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
    </div>
  );
}