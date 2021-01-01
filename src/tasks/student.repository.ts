import { Student } from './student.entity';
import { EntityRepository, Repository } from 'typeorm';
import { getStudentFilterDto } from './dto/getStudentFilterdto';
import { Teacher } from 'src/teacherauth/teacher.entity';



@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getStudents(filterDto: getStudentFilterDto,
    teacher: Teacher): Promise<Student[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('student');
    query.andWhere('student.teacherId = :teacherId',{teacherId: teacher.id});
    if (search) {
      query.andWhere('student.name LIKE: search', { search: `%${search}%` });
    }
    const students = await query.getMany();
    return students;
  }


}
