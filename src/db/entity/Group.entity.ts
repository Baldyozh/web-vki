import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  contacts!: string;

  @OneToMany(() => {
    // Ленивая загрузка для избежания циклической зависимости
    const Student = require('./Student.entity').Student;
    return Student;
  }, (student: any) => student.group)
  students!: any[];
}
