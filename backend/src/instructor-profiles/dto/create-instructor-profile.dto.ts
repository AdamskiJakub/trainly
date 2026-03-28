import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateInstructorProfileDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsOptional()
  specializations?: string[];

  @IsString()
  @IsOptional()
  city?: string;
}
