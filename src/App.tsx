import { useState, useRef, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import type { Message } from './types/message';
import './index.css';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string, image?: File) => {
    // 1. user メッセージを追加
    const userMessage: Message = {
      role: 'user',
      content: text,
      image,
    };

    // 2. 仮の assistant メッセージを作る（例: オウム返し）
    const assistantMessage: Message = {
      role: 'assistant',
      content: [
        text && `「${text}」とおっしゃいましたね。`,
        image && '画像も受け取りました！',
      ].filter(Boolean).join('\n')
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
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
