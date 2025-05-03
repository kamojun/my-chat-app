import { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './index.css';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: '（仮の応答）' }]);
    }, 500);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  // return <h1 className="text-3xl font-bold text-red-500">Hello Tailwind</h1>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-chat-container">
          <MessageList messages={messages} />
        </div>
        <div ref={bottomRef} />
      </div>
      <div className="border-t bg-white p-4">
        <div className="mx-auto w-full max-w-chat-container">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
