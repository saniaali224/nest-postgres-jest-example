
import { IsOptional,  IsNotEmpty } from 'class-validator';

export class getStudentFilterDto {
  

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
