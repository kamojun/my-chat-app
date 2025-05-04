import { Request, Response, RequestHandler } from 'express';
import { processImages } from '../utils/imageProcessor';

interface MessageRequest extends Request {
  body: {
    content: string;
  };
  files?: Express.Multer.File[]; // ✅ 複数ファイルに変更
}
export const handleMessage: RequestHandler = async (req, res) => {
  const content = (req.body as any).content;
  const files = req.files as Express.Multer.File[] ?? [];

  const processedImageUrls = await processImages(files);

  const replyContent = [
    content && `"${content.split('').reverse().join('')}"`,
    processedImageUrls.length > 0 && `画像処理しました。`,
  ]
    .filter(Boolean)
    .join('\n');

  res.json({
    role: 'assistant',
    content: replyContent,
    imageUrls: processedImageUrls,
  });
};
