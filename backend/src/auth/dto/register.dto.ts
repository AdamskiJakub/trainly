import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Username can only contain lowercase letters, numbers, and hyphens',
  })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
