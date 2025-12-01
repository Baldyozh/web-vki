import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import AppDataSource, { ensureInitialized } from './AppDataSource';

/**
 * Получение студентов
 * @returns Promise<StudentInterface[]>
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  await ensureInitialized();
  const studentRepository = AppDataSource.getRepository(Student);
  return await studentRepository.find({
    relations: ['group'],
  });
};

/**
 * Получение студента по ID
 * @param studentId ИД студента
 * @returns Promise<StudentInterface | null>
 */
export const getStudentByIdDb = async (studentId: number): Promise<StudentInterface | null> => {
  await ensureInitialized();
  const studentRepository = AppDataSource.getRepository(Student);
  return await studentRepository.findOne({
    where: { id: studentId },
    relations: ['group'],
  });
};

/**
 * Удаления студента
 * @param studentId ИД удаляемого студента
 * @returns Promise<number>
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  await ensureInitialized();
  const studentRepository = AppDataSource.getRepository(Student);
  await studentRepository.delete(studentId);
  return studentId;
};

/**
 * Добавление студента
 * @param studentField поля студента
 * @returns Promise<StudentInterface>
 */
export const addStudentDb = async (studentFields: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  await ensureInitialized();
  const studentRepository = AppDataSource.getRepository(Student);
  const student = new Student();
  const newStudent = await studentRepository.save({
    ...student,
    ...studentFields,
  });
  return newStudent;
};

/**
 * Добавление рандомных студента
 * @param amount количество рандомных записей
 * @returns Promise<StudentInterface>
 */
export const addRandomStudentsDb = async (amount: number = 10): Promise<StudentInterface[]> => {
  const students: StudentInterface[] = [];

  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();

    const newStudent = await addStudentDb({
      ...fio,
      contacts: 'contact',
      groupId: 1,
    });
    students.push(newStudent);
  }

  return students;
};
