import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CancelBookingDto {
  @IsEnum(['client', 'instructor'])
  @IsNotEmpty()
  cancelledBy: 'client' | 'instructor';

  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
