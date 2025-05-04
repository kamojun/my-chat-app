import type { MessageData } from '../types/message';

export default function ChatMessage({ message }: { message: MessageData }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`px-4 py-2 rounded-lg shadow w-fit break-words max-w-xs
        ${isUser ? 'bg-blue-100 self-end text-right' : 'bg-white self-start text-left border'}
      `}
    >
      {message.content && (
        <p className="whitespace-pre-wrap">{message.content}</p>
      )}
      {message.images?.map(image => <img
        src={URL.createObjectURL(image)}
        alt="sent"
        className="mt-2 max-w-xs h-auto rounded"
      />)}

      {message.imageUrls?.map(url => <img
        src={url}
        alt="添付画像"
        className="max-w-xs mt-2 rounded"
      />)}
    </div>
  );
}
