import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateInstructorProfileDto {
  // userId is derived from JWT token in controller, not from request body
  // This prevents users from creating profiles for other users

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specializations?: string[];

  @IsString()
  @IsOptional()
  city?: string;
}
