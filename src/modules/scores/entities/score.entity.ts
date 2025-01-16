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
  math: number;

  @Column({ nullable: true, type: 'float' })
  literature: number;

  @Column({ nullable: true, type: 'float' })
  language: number;

  @Column({ nullable: true, type: 'float' })
  physics: number;

  @Column({ nullable: true, type: 'float' })
  chemistry: number;

  @Column({ nullable: true, type: 'float' })
  biology: number;

  @Column({ nullable: true, type: 'float' })
  history: number;

  @Column({ nullable: true, type: 'float' })
  geography: number;

  @Column({ nullable: true, type: 'float' })
  civic_education: number;

  @Column({ nullable: true })
  language_code: string;

  @JoinColumn({ name: 'studentRegistrationNo' })
  @OneToOne(() => Student, (student) => student.score, { nullable: false })
  student: Student;
}
