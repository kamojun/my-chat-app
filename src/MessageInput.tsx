import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

export default function MessageInput({ onSend }: { onSend: (text: string, image?: File) => void }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = () => {
    if (!text.trim() && !image) return;
    onSend(text, image || undefined);
    setText('');
    setImage(null);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          setImage(file);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (isComposing) return;
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <textarea
            className="w-full h-10 border rounded px-3 py-2 resize-none box-border focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="メッセージを入力..."
          />
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-24 h-auto rounded border"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
        >
          <HiArrowUp size={20} />
        </button>
      </div>
    </form>
  );
}
