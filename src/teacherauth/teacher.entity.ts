import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/tasks/student.entity';
@Entity()
@Unique(['username'])
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt: string;

    @OneToMany(type => Student, student => student.teacher, { eager: true })
    students: Student[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}  