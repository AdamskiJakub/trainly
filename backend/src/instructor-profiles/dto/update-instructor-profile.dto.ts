import { IsString, IsOptional, IsArray, IsNumber, IsBoolean, Min, ArrayMaxSize } from "class-validator";

export class UpdateInstructorProfileDto {
    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    tagline?: string;

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
    location?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    hourlyRate?: number;

    @IsString()
    @IsOptional()
    photoUrl?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    gallery?: string[];

    @IsString()
    @IsOptional()
    availability?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    languages?: string[];

    @IsNumber()
    @Min(0)
    @IsOptional()
    yearsExperience?: number;
}