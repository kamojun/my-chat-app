import { useState } from 'react';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        className="flex-1 border rounded px-2 py-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="メッセージを入力..."
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">
        送信
      </button>
    </div>
  );
}
