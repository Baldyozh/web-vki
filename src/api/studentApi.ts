import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const addStudentApi = async (student: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const newStudent = await response.json() as StudentInterface;
    return newStudent;
  }
  catch (err) {
    console.log('>>> addStudentApi', err);
    throw err;
  }
};

export const deleteStudentApi = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const result = await response.json() as { success: boolean };
    return result.success;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    throw err;
  }
};