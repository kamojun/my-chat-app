import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (isComposing) return; // ← 変換中なら何もしない
      e.preventDefault();
      handleSubmit(); // ← requestSubmit() は使わない！
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex gap-2 w-full"
    >
      <TextareaAutosize
        className="flex-1 border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="メッセージを入力..."
        minRows={1}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
      >
        送信
      </button>
    </form>
  );
}
