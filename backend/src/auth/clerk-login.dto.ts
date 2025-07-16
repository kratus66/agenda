// src/auth/clerk-login.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class ClerkLoginDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

