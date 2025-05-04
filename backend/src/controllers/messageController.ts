import { Request, Response } from 'express';

interface MessageRequest extends Request {
  body: {
    content: string;
  };
  images?: Express.Multer.File[]; // ✅ 複数ファイルに変更
}


export const handleMessage = (req: MessageRequest, res: Response) => {
  console.log(req.body);
  const content = req.body.content;
  const files = req.files as Express.Multer.File[] || [];
  const imageUrls = files.map((file) => `/uploads/${file.filename}`);

  const replyContent = [
    content && `「${content}」とおっしゃいましたね。`,
    imageUrls.length > 0 && `画像を ${imageUrls.length} 枚受け取りました。`,
    '(バックエンドから返信)',
  ]
    .filter(Boolean)
    .join('\n');

  res.json({
    role: 'assistant',
    content: replyContent,
    imageUrls,
  });
};
