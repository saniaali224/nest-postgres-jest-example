import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
// import { AuthModule } from '../auth/auth.module';
import { StudentRepository } from './student.repository';
import { StudentController } from './student.controller';
import { StudentsService } from './student.service';

@Module({
  
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    TypeOrmModule.forFeature([StudentRepository]),
    
  ],
  controllers: [TasksController,StudentController],
  providers: [TasksService,StudentsService],
})
export class TasksModule { }
