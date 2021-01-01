import { Controller, Body, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { TAuthCredentials } from './dto/create-teacher-dto';
import { TeacherauthService } from './teacherauth.service';
import { AuthGuard } from '@nestjs/passport';
import { getTeacher } from './get-Tuser-decorator';
import { Teacher } from './teacher.entity';



@Controller('teacherauth')
export class TeacherauthController {
  TeacherauthService: any;
  constructor(
    private TauthService: TeacherauthService,

  ) {

  }
  @Post('/signup')
  signup(@Body(ValidationPipe) tauthCredentials: TAuthCredentials) {
    return this.TeacherauthService.signUp(tauthCredentials);
  }
  @Post('/signIn')
  signIn(@Body(ValidationPipe) tauthCredentials: TAuthCredentials): Promise<{ accessToken: string }> {
    return this.TeacherauthService.signIn(tauthCredentials);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@getTeacher() teacher:Teacher){
    console.log(teacher);
  }
}
