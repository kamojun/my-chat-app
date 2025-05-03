import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }]);

    // 仮のレスポンス
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: '（仮の応答）' }]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}