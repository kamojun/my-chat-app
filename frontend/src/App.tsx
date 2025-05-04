import { useState, useRef, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './index.css';
import { MessageData } from './types/message';

export default function App() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string, images: File[]) => {
    const formData = new FormData();
    formData.append('content', text);
    images.forEach(image => formData.append('images', image));
    console.log('送信内容:');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }


    // ユーザーのメッセージを先に追加
    const userMessage: MessageData = {
      role: 'user',
      content: text,
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
