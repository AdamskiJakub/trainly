import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { CreateAvailabilityExceptionDto } from './dto/create-availability-exception.dto';
import { UpdateAvailabilityExceptionDto } from './dto/update-availability-exception.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  // ==================== WEEKLY AVAILABILITY ====================

  /**
   * GET /availability/weekly/:instructorId
   * Get weekly availability for an instructor (public)
   */
  @Get('weekly/:instructorId')
  async getWeeklyAvailability(@Param('instructorId') instructorId: string) {
    return this.availabilityService.getWeeklyAvailability(instructorId);
  }

  /**
   * POST /availability/weekly/:instructorId
   * Create weekly availability slot (instructor only)
   */
  @UseGuards(JwtAuthGuard)
  @Post('weekly/:instructorId')
  async createWeeklyAvailability(
    @Request() req,
    @Param('instructorId') instructorId: string,
    @Body() dto: CreateAvailabilityDto,
  ) {
    return this.availabilityService.createWeeklyAvailability(
      req.user.id,
      instructorId,
      dto,
    );
  }

  /**
   * PATCH /availability/weekly/:id
   * Update weekly availability slot (instructor only)
   */
  @UseGuards(JwtAuthGuard)
  @Patch('weekly/:id')
  async updateWeeklyAvailability(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateAvailabilityDto,
  ) {
    return this.availabilityService.updateWeeklyAvailability(
      req.user.id,
      id,
      dto,
    );
  }

  /**
   * DELETE /availability/weekly/:id
   * Delete weekly availability slot (instructor only)
   */
  @UseGuards(JwtAuthGuard)
  @Delete('weekly/:id')
  async deleteWeeklyAvailability(@Request() req, @Param('id') id: string) {
    return this.availabilityService.deleteWeeklyAvailability(
      req.user.id,
      id,
    );
  }

  // ==================== AVAILABILITY EXCEPTIONS ====================

  /**
   * GET /availability/exceptions/:instructorId
   * Get availability exceptions for an instructor (public)
   */
  @Get('exceptions/:instructorId')
  async getAvailabilityExceptions(
    @Param('instructorId') instructorId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return this.availabilityService.getAvailabilityExceptions(
      instructorId,
      start,
      end,
    );
  }

  /**
   * POST /availability/exceptions/:instructorId
   * Create availability exception (instructor only)
   */
  @UseGuards(JwtAuthGuard)
  @Post('exceptions/:instructorId')
  async createAvailabilityException(
    @Request() req,
    @Param('instructorId') instructorId: string,
    @Body() dto: CreateAvailabilityExceptionDto,
  ) {
    return this.availabilityService.createAvailabilityException(
      req.user.id,
      instructorId,
      dto,
    );
  }

  /**
   * PATCH /availability/exceptions/:id
   * Update availability exception (instructor only)
   */
  @UseGuards(JwtAuthGuard)
  @Patch('exceptions/:id')
  async updateAvailabilityException(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateAvailabilityExceptionDto,
  ) {
    return this.availabilityService.updateAvailabilityException(
      req.user.id,
      id,
      dto,
    );
  }

  /**
   * DELETE /availability/exceptions/:id
   * Delete availability exception (instructor only)
   */
  @UseGuards(JwtAuthGuard)
  @Delete('exceptions/:id')
  async deleteAvailabilityException(@Request() req, @Param('id') id: string) {
    return this.availabilityService.deleteAvailabilityException(
      req.user.id,
      id,
    );
  }
}

