import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Query,
  NotFoundException,
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

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('specialization') specialization?: string,
    @Query('tags') tags?: string | string[],
    @Query('goals') goals?: string | string[],
    @Query('minRating') minRating?: string,
    @Query('priceMin') priceMin?: string,
    @Query('priceMax') priceMax?: string,
  ) {
    const filters = {
      city,
      specialization,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : undefined,
      goals: Array.isArray(goals) ? goals : goals ? [goals] : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      priceMin: priceMin ? parseFloat(priceMin) : undefined,
      priceMax: priceMax ? parseFloat(priceMax) : undefined,
    };
    return this.profilesService.findAll(filters);
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

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const profile = await this.profilesService.findByUsername(username);
    if (!profile) {
      throw new NotFoundException(`Instructor with username "${username}" not found`);
    }
    return profile;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateInstructorProfileDto, @Req() req: Request) {
    const user = req.user as AuthenticatedUser;
    
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (user.role !== 'INSTRUCTOR') {
      throw new ForbiddenException(
        'Only users with INSTRUCTOR role can create instructor profiles',
      );
    }

    return this.profilesService.create(user.id, dto);
  }

  
}
