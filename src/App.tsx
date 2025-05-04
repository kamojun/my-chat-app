import { useState, useRef, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import type { Message } from './types/message';
import './index.css';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    // ユーザーのメッセージを先に追加
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('送信エラー:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '（エラーが発生しました）' },
      ]);
    }
  };

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
    <div className="flex flex-col h-screen">
      {/* 上部: メッセージリスト */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-chat-container px-4 py-3">
          <MessageList messages={messages} />
        </div>
      </div>

      {/* 下部: 入力欄 */}
      <div className="border-t bg-white">
        <div className="mx-auto w-full max-w-chat-container px-4 py-2">
          <MessageInput onSend={sendMessage} />
        </div>
      </div>
    </div>


  );
}
