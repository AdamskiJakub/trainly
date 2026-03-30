import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorProfileDto } from './dto/create-instructor-profile.dto';

@Injectable()
export class InstructorProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateInstructorProfileDto) {
    try {
      const profile = await this.prisma.instructorProfile.create({
        data: {
          userId: userId,
          bio: dto.bio,
          specializations: dto.specializations || [],
          city: dto.city,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },
      });

      return profile;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Instructor profile already exists for this user');
      }
      throw error;
    }
  }

  async findByUserId(userId: string) {
    return this.prisma.instructorProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });
  }
}
