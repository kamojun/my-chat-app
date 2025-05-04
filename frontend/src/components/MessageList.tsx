import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import type { MessageData } from '../types/message';

export default function MessageList({ messages }: { messages: MessageData[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-3 flex flex-col">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

