// src/user/dto/create-user.dto.ts
import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 * This DTO is used to validate the incoming data from the request body.
 */
export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
