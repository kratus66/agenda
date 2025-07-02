import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './UserEntity';
import { UserDto } from './User.dto';
import { LoginDto } from './LoginDto';


@Controller('auth')
export class AuthController {
    constructor( private authservice : AuthService ){}

    @Get()
    async ObtenerUsuario():Promise<User[]>{
        const users= await this.authservice.getUsers();
        return users;
    }
    @Post('register')
    async createUser(@Body() dto:UserDto):Promise<string>{
        const res= await this.authservice.createUser(dto);
        return "usuario creado con exito"
    }

    @Post('login')
    async login(@Body() login:LoginDto ){
        const res= await this.authservice.login(login);
        return res;
    }


}
