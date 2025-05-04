import { useState, useRef, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './index.css';
import { MessageData } from './types/message';

export default function App() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string, image?: File) => {
    const formData = new FormData();
    formData.append('content', text);
    if (image) {
      formData.append('image', image);
    }
    // ユーザーのメッセージを先に追加
    const userMessage: MessageData = {
      role: 'user',
      content: text,
      image,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json() as MessageData;
      setMessages((prev) => [...prev, data]);
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
    const userMessage: MessageData = {
      role: 'user',
      content: text,
      image,
    };

    // 2. 仮の assistant メッセージを作る（例: オウム返し）
    const assistantMessage: MessageData = {
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
