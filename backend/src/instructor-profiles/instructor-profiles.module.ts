import { Module } from '@nestjs/common';
import { InstructorProfilesController } from './instructor-profiles.controller';
import { InstructorProfilesService } from './instructor-profiles.service';

@Module({
  controllers: [InstructorProfilesController],
  providers: [InstructorProfilesService],
  exports: [InstructorProfilesService],
})
export class InstructorProfilesModule {}
