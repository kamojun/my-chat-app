import { FC } from 'react';

interface Props {
  file: File;
  onRemove: () => void;
}

const ImagePreview: FC<Props> = ({ file, onRemove }) => {
  return (
    <div className="relative w-20 h-20 rounded overflow-hidden shadow border">
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-opacity-70"
        aria-label="画像を削除"
      >
        ×
      </button>
    </div>
  );
};

export default ImagePreview;
