import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-studentdto';
import { getStudentFilterDto } from './dto/getStudentFilterdto';
import { Teacher } from 'src/teacherauth/teacher.entity';
import { getTeacher } from 'src/teacherauth/get-Tuser-decorator';

@Injectable()
export class StudentsService {
   constructor(
      @InjectRepository(StudentRepository)
      private studentRepository: StudentRepository

   ) { }
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   getStudents(studentFilterdto: getStudentFilterDto,
      teacher: Teacher): Promise<Student[]> {
      return this.studentRepository.getStudents(studentFilterdto, teacher);
   };
   async getTaskById(id: number, @getTeacher() teacher: Teacher,): Promise<Student> {
      const found = await this.studentRepository.findOne({ where: { id, teacherId: teacher.id } });
      if (!found) {
         throw new NotFoundException(`Task with ${id} not found.`);
      }
      return found;
   };
   async createTask(createStudentDto: CreateStudentDto,
      @getTeacher() teacher: Teacher,): Promise<Student> {
      const { name, description } = createStudentDto;
      const student = new Student();
      student.name = name;
      student.description = description;
      student.teacher = teacher;
      await student.save();
      delete student.teacher;
      return student;
   }
   async deleteStudent(id: number,
      @getTeacher() teacher: Teacher,): Promise<void> {
      const result = await this.studentRepository.delete({id,teacherId:teacher.id});
      console.log(result);
      if (result.affected === 0) {
         throw new NotFoundException(`Task with ${id} deleted.`);
      }

   }
   async updateStudent(id: number, description: string,
      @getTeacher() teacher: Teacher,
      ): Promise<Student> {
      const student = await this.getTaskById(id,teacher);
      student.description = description;
      await student.save();
      return student;
   }
}
