import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './UserEntity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([User]), 
  PassportModule,
  JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn: '1h'}
  })
],
  controllers: [AuthController],
  providers: [AuthService], 
  
})
export class AuthModule {}
