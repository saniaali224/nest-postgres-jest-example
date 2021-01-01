import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './student.service';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-studentdto';
import { getStudentFilterDto } from './dto/getStudentFilterdto';
import { getTeacher } from 'src/teacherauth/get-Tuser-decorator';
import { Teacher } from 'src/teacherauth/teacher.entity';
import { teacher } from 'src/teacherauth/teacher.repository';


@Controller('students')

export class StudentController {

  constructor(private studentsService: StudentsService) { }
 private logger = new Logger('StudentController')
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe,
  ) id: number,
    @getTeacher() teacher: Teacher,): Promise<Student> {
      this.logger.verbose(`teacher "${teacher.username}"retreiving all tasks. ${JSON.stringify(getStudentFilterDto)}`)
    return this.studentsService.getTaskById(id,teacher);

  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createStudentDto: CreateStudentDto,
    @getTeacher() teacher: Teacher,
  ): Promise<Student> {
    return this.studentsService.createTask(createStudentDto, teacher);
  }
  @Delete('/:id')
  deleteStudent(@Param('id') id: number,
  @getTeacher() teacher: Teacher,): void {
    this.studentsService.deleteStudent(id,teacher);
  }
  @Patch('/:id/description')
  updateTaskById(@Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
    @getTeacher() teacher: Teacher, ): Promise<Student> {
    return this.studentsService.updateStudent(id, description,teacher);


  }
  @Get()
  getStudents(@Query(ValidationPipe) studentFilterDto: getStudentFilterDto,
    @getTeacher() teacher: Teacher,): Promise<Student[]> {
    return this.studentsService.getStudents(studentFilterDto, teacher);
  }
}
