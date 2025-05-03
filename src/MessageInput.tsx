import { useState } from 'react';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="flex gap-2 w-full max-w-chat-container mx-auto">
      <input
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="メッセージを入力..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
      >
        送信
      </button>
    </div>
  );

}
