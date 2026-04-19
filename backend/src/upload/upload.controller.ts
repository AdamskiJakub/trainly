import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadService.uploadFile(file);
    return { url };
  }

  @Post('gallery')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadGalleryPhotos(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.uploadService.uploadMultipleFiles(files);
    return { urls };
  }
}
