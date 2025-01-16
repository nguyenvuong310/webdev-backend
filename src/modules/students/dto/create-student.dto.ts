import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  registrationNo: string;

  constructor(registrationNo: string) {
    this.registrationNo = registrationNo;
  }
}
