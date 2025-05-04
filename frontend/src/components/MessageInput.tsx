import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import TextareaAutosize from 'react-textarea-autosize';
import ImagePreview from './ImagePreview';

export default function MessageInput({ onSend }: { onSend: (text: string, image?: File) => void }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = () => {
    if (!text.trim() && !image) return;
    onSend(text, image || undefined);
    setText('');
    setImage(null);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {

    // const newImages: File[] = [];
    const newImages = Array.from(e.clipboardData.items)
      .filter((item) => item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (newImages.length > 0) {
      e.preventDefault(); // ← ⛔ テキストの貼り付けをブロック
      setImages((prev) => [...prev, ...newImages]);
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
          {images.map((img, index) => (
            <ImagePreview
              key={index}
              file={img}
              onRemove={() => setImages((prev) => prev.filter((_, i) => i !== index))}
            />
          ))}
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
