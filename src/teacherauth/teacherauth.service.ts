import { Injectable, UnauthorizedException } from '@nestjs/common';
import { teacher } from './teacher.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TAuthCredentials } from './dto/create-teacher-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeacherauthService {
    constructor(
        @InjectRepository(teacher)
        private teacherRepository:teacher, 
        private jwtService : JwtService
    ){

    }
    async signUp(tAuthCredentialsdto:TAuthCredentials): Promise<void>{
        return this.teacherRepository.SignUp(tAuthCredentialsdto);
    }
    async siginIn(tAuthCredentialsdto:TAuthCredentials): Promise< {accessToken: string}>{
        const username= await this.teacherRepository.validateUserPassword(tAuthCredentialsdto);
        
        if(!username){
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload ={username};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }
}
