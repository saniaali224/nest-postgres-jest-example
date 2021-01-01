import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtPayload } from './jwt-auth-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'',
        });
    }
async validate(payload: JwtPayload){
    const {username}= payload;
    const user =await this.teacherRepository.findOne({username});
    if (!user) {
        throw new UnauthorizedException();
    } else {
        return user;
        
    }
}



}