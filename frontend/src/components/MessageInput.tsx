import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import TextareaAutosize from 'react-textarea-autosize';
import ImagePreview from './ImagePreview';

export default function MessageInput({ onSend }: { onSend: (text: string, images: File[]) => void }) {
  const [text, setText] = useState('');
  // const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isComposing, _] = useState(false);

  const handleSubmit = () => {
    if (!text.trim() && images.length == 0) return;
    onSend(text, images);
    setText('');
    setImages([]);
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
      <div className="flex flex-col gap-2 w-full">

        {/* 入力欄＋送信ボタン（横並び） */}
        <div className="flex items-center gap-2">
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            className="w-full border rounded px-3 py-3 resize-none box-border focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder="メッセージを入力..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 shrink-0"
          >
            <HiArrowUp size={20} />
          </button>
        </div>

        {/* ✅ サムネイルたちはここに */}
        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <ImagePreview
                key={i}
                file={img}
                onRemove={() => setImages((prev) => prev.filter((_, j) => j !== i))}
              />
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
