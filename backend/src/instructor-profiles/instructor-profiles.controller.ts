import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InstructorProfilesService } from './instructor-profiles.service';
import { CreateInstructorProfileDto } from './dto/create-instructor-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import type { AuthenticatedUser } from '../types/express';

@Controller('instructor-profiles')
export class InstructorProfilesController {
  constructor(private profilesService: InstructorProfilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateInstructorProfileDto, @Req() req: Request) {
    const user = req.user as AuthenticatedUser;
    
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Authorization: Only instructors can create instructor profiles
    if (user.role !== 'INSTRUCTOR') {
      throw new ForbiddenException(
        'Only users with INSTRUCTOR role can create instructor profiles',
      );
    }

    // Always use authenticated user's ID (security - prevent creating profiles for other users)
    return this.profilesService.create(user.id, dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req: Request) {
    const user = req.user as AuthenticatedUser;
    
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    
    return this.profilesService.findByUserId(user.id);
  }
}
