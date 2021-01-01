import { Repository, EntityRepository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { TAuthCredentials } from './dto/create-teacher-dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(Teacher)
export class teacher extends Repository<Teacher>{
  async SignUp(Tauthcredentials: TAuthCredentials): Promise<void> {
    const { username, password } = Tauthcredentials;
    const salt = await bcrypt.genSalt();
    const TUser = new Teacher();
    TUser.username = username;
    TUser.salt=salt;
    TUser.password = await this.hashPassword(password, salt);
    try {
      await TUser.save();
    } catch (error) {
      if (error.code===23505) {
        throw new ConflictException('username already exist');
      } else {
        throw new InternalServerErrorException();
      }
     

    }

  } 
  async validateUserPassword(Tauthcredentials:TAuthCredentials): Promise<string>{
   const {username ,password}=Tauthcredentials;
   const user= await this.findOne({username});
   if(user&& await user.validatePassword(password)){
    return user.username;

   }else{
     return null;
   }
  };
  private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
      };
} 