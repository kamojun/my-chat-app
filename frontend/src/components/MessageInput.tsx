import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import TextareaAutosize from 'react-textarea-autosize';

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
    let foundImage = false;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          setImage(file);
          foundImage = true;
        }
      }
    }

    if (foundImage) {
      e.preventDefault(); // ← ⛔ テキストの貼り付けをブロック
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
        <div className="relative w-full">
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            className={`w-full border rounded px-3 py-3 resize-none box-border focus:outline-none focus:ring-2 focus:ring-blue-300 ${image ? 'pl-14' : ''
              }`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="メッセージを入力..."
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="absolute top-1/2 left-2 w-10 h-10 -translate-y-1/2 object-cover border rounded shadow"
            />
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
