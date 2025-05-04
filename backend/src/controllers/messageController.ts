import { Request, Response } from 'express';

interface MessageRequest extends Request {
  body: {
    content: string;
  };
  file?: Express.Multer.File; // ← ここがポイント！
}


export const handleMessage = (req: MessageRequest, res: Response) => {
  console.log(req.body)
  const content = req.body.content;
  const file = req.file; // ここにアップロード画像
  console.log(content);
  console.log('image path:', file?.path);

  res.json({
    role: 'assistant',
    content: (content ? `「${content}」とおっしゃいましたね。(バックエンドより返信)` : "")
    // imageUrl: file ? `/uploads/${file.filename}` : null,
  });
};
