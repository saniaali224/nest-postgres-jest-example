import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Teacher } from 'src/teacherauth/teacher.entity';


@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(type => Teacher, teacher => teacher.students, { eager: false })
  teacher: Teacher;

  @Column()

  teacherId: number;

  

 

  
}
