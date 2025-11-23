import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  uuid?: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  middleName!: string;

  @Column({ default: '' })
  contacts?: string;

  @Column()
  groupId!: number;

  @ManyToOne(() => {
    // Ленивая загрузка для избежания циклической зависимости
    const Group = require('./Group.entity').Group;
    return Group;
  }, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group?: any;
}
