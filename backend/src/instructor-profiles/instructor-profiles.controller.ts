import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { InstructorProfilesService } from './instructor-profiles.service';
import { CreateInstructorProfileDto } from './dto/create-instructor-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('instructor-profiles')
export class InstructorProfilesController {
  constructor(private profilesService: InstructorProfilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateInstructorProfileDto, @Req() req: Request) {
    // Use authenticated user's ID if not provided
    const userId = dto.userId || (req.user as any).userId;
    return this.profilesService.create({ ...dto, userId });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req: Request) {
    const userId = (req.user as any).userId;
    return this.profilesService.findByUserId(userId);
  }
}
