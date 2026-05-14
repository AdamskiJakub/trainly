import { Module } from '@nestjs/common';
import { InstructorProfilesController } from './instructor-profiles.controller';
import { InstructorProfilesService } from './instructor-profiles.service';
import { ConfigModule as AppConfigModule } from '../config/config.module';
import { IsValidConfigIdConstraint } from '../common/validators/is-valid-config-id.validator';

@Module({
  imports: [AppConfigModule],
  controllers: [InstructorProfilesController],
  providers: [InstructorProfilesService, IsValidConfigIdConstraint],
  exports: [InstructorProfilesService],
})
export class InstructorProfilesModule {}
