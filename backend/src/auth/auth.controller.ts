import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './User.dto';
import { LoginDto } from './LoginDto';
import { ClerkLoginDto } from './clerk-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
  const token = await this.authService.createUser(dto);
  return { access_token: token };
}


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('clerk-login')
  async clerkLogin(@Body() dto: ClerkLoginDto) {
    return await this.authService.syncClerkUser(dto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.authService.findUserById(req.user.sub);
    
  }
}




