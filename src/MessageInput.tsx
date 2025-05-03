import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';


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
      if (isComposing) return;
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full max-w-chat-container mx-auto"
    >
      <div className="flex items-center gap-2">
        <textarea
          className="flex-1 h-10 border rounded px-3 py-2 resize-none box-border focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="メッセージを入力..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
        >
          <HiArrowUp size={24} />
        </button>

      </div>
    </form>
  );
}
