import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

import { User } from './UserEntity';
import { UserDto } from './User.dto';
import { LoginDto } from './LoginDto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async createUser(dto: UserDto): Promise<string> {
    // 1. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 2. Crear el usuario con la contraseña encriptada
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);

      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return token;
    } catch (error: any) {
      if (error.code === '23505' && error.detail?.includes('(email)')) {
        throw new ConflictException('El correo ya está registrado.');
      }
      throw new InternalServerErrorException('Error al registrar el usuario.');
    }
  }

  async login(login: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email: login.email } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado por Email');
    }

    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }

  /**
   * ✅ Verifica el token de Clerk usando /v1/tokens/verify y emite un JWT local
   */
  async syncClerkUser(clerkToken: string): Promise<{ access_token: string }> {
    const apiKey = this.configService.get<string>('CLERK_SECRET_KEY');
    if (!apiKey) throw new Error('Falta CLERK_SECRET_KEY en el .env');

    try {
      const verifyResponse = await axios.post(
        'https://api.clerk.dev/v1/tokens/verify',
        { token: clerkToken },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { sub, email_address, first_name, last_name } = verifyResponse.data?.payload;
      if (!sub || !email_address) throw new UnauthorizedException('Token inválido');

      // Verificar si el usuario ya existe en DB
      let user = await this.userRepository.findOne({ where: { email: email_address } });

      // Si no existe, lo creamos
      if (!user) {
        user = this.userRepository.create({
          email: email_address,
          name: `${first_name} ${last_name}`,
          password: '', // podrías registrar un marcador de auth externa
        });
        user = await this.userRepository.save(user);
      }

      const jwt = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return { access_token: jwt };
    } catch (error) {
      console.error('❌ Error verificando token con Clerk:', error?.response?.data || error.message);
      throw new UnauthorizedException('No se pudo autenticar con Clerk');
    }
  }

  async findUserById(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };
  }
}
