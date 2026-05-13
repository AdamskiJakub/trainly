import { Module } from '@nestjs/common';
import { InstructorProfilesController } from './instructor-profiles.controller';
import { InstructorProfilesService } from './instructor-profiles.service';
import {ConfigModule as AppConfigModule} from "../config/config.module";
@Module({
  imports: [AppConfigModule],
  controllers: [InstructorProfilesController],
  providers: [InstructorProfilesService],
  exports: [InstructorProfilesService],
})
export class InstructorProfilesModule {}
