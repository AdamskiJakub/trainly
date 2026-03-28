import { Module } from '@nestjs/common';
import { InstructorProfilesController } from './instructor-profiles.controller';
import { InstructorProfilesService } from './instructor-profiles.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InstructorProfilesController],
  providers: [InstructorProfilesService],
  exports: [InstructorProfilesService],
})
export class InstructorProfilesModule {}
