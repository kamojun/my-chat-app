// src/utils/imageProcessor.ts
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export async function processImages(files: Express.Multer.File[]): Promise<string[]> {
  const processedUrls: string[] = [];

  for (const file of files) {
    const inputPath = file.path;
    const outputFilename = `processed-${file.filename}.png`;
    const outputPath = path.join('uploads', outputFilename);

    await sharp(inputPath)
      .grayscale()
      // .flip()
      .flop()
      .toFile(outputPath);

    await fs.unlink(inputPath); // 元画像は削除（任意）

    processedUrls.push(`/uploads/${outputFilename}`);
  }

  return processedUrls;
}
