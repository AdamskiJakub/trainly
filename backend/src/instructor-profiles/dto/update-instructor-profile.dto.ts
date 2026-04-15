import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  Min,
  ArrayMaxSize,
} from 'class-validator';

export class UpdateInstructorProfileDto {
  @IsString()
  @IsOptional()
  bio?: string | null;

  @IsString()
  @IsOptional()
  tagline?: string | null;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @IsOptional()
  specializations?: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(8)
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(4)
  @IsOptional()
  goals?: string[];

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsString()
  @IsOptional()
  city?: string | null;

  @IsNumber()
  @Min(0)
  @IsOptional()
  hourlyRate?: number | null;

  @IsBoolean()
  @IsOptional()
  packageDealsEnabled?: boolean | null;

  @IsString()
  @IsOptional()
  packageDealsDescription?: string | null;

  @IsString()
  @IsOptional()
  photoUrl?: string | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @IsString()
  @IsOptional()
  availability?: string | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  yearsExperience?: number | null;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;
}
