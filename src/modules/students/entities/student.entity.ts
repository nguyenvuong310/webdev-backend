import { Score } from '../../../modules/scores/entities/score.entity';
import { Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryColumn()
  registrationNo: string;

  @OneToOne(() => Score, (score) => score.student)
  score: Score;

  constructor(registrationNo: string) {
    this.registrationNo = registrationNo;
  }
}
