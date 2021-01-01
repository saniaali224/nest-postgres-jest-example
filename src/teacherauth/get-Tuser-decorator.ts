import { createParamDecorator } from '@nestjs/common';
import { Teacher } from './teacher.entity';

export const getTeacher= createParamDecorator((data,req): Teacher=>{
return req.teacher;
});