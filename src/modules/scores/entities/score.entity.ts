import { Student } from '../../../modules/students/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'float' })
  math_score: number;

  @Column({ nullable: true, type: 'float' })
  literature_score: number;

  @Column({ nullable: true, type: 'float' })
  language_score: number;

  @Column({ nullable: true, type: 'float' })
  physics_score: number;

  @Column({ nullable: true, type: 'float' })
  chemistry_score: number;

  @Column({ nullable: true, type: 'float' })
  biology_score: number;

  @Column({ nullable: true, type: 'float' })
  history_score: number;

  @Column({ nullable: true, type: 'float' })
  geography_score: number;

  @Column({ nullable: true, type: 'float' })
  civic_education_score: number;

  @Column({ nullable: true })
  language_code: string;

  @JoinColumn({ name: 'studentRegistrationNo' })
  @OneToOne(() => Student, (student) => student.score, { nullable: false })
  student: Student;
}
