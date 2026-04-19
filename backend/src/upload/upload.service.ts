import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'uploads');
  private readonly allowedImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  private readonly allowedVideoMimeTypes = ['video/mp4', 'video/webm'];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  async uploadFile(file: Express.Multer.File, allowVideo = false): Promise<string> {
    // Validate file
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedMimeTypes = allowVideo 
      ? [...this.allowedImageMimeTypes, ...this.allowedVideoMimeTypes]
      : this.allowedImageMimeTypes;

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        allowVideo 
          ? 'Invalid file type. Only JPEG, PNG, WebP, MP4, and WebM are allowed.'
          : 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      );
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException('File too large. Maximum size is 5MB.');
    }

    // Ensure uploads directory exists
    if (!existsSync(this.uploadPath)) {
      await mkdir(this.uploadPath, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = extname(file.originalname);
    const filename = `${timestamp}-${randomString}${ext}`;
    const filepath = join(this.uploadPath, filename);

    // Save file
    await writeFile(filepath, file.buffer);

    // Return URL (we'll serve from /uploads/filename)
    return `/uploads/${filename}`;
  }

  async uploadMultipleFiles(files: Express.Multer.File[], allowVideo = false): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    if (files.length > 10) {
      throw new BadRequestException('Maximum 10 files allowed');
    }

    const uploadPromises = files.map(file => this.uploadFile(file, allowVideo));
    return Promise.all(uploadPromises);
  }
}
