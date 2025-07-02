import { Injectable } from '@nestjs/common';
import { User } from './UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './User.dto';
import { LoginDto } from './LoginDto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    
    
    
    constructor(
        @InjectRepository(User)
        private readonly userrepository:Repository<User>,
        private readonly jwtService: JwtService,
    ){

    }

    async getUsers(){
        return await this.userrepository.find();
    }

    async createUser(dto: UserDto): Promise<string> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = this.userrepository.create({
        ...dto,
        password: hashedPassword,
    });
  await this.userrepository.save(newUser);
  return 'Usuario creado con éxito';
}

    async login(login: LoginDto) {
    const user = await this.userrepository.findOne({ where: { email: login.email } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    
    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
