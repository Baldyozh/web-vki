import { getStudentsDb, addStudentDb } from '@/db/studentDb';
import { type NextApiRequest } from 'next/types';

export async function GET(): Promise<Response> {
  try {
    const students = await getStudentsDb();

    // Сериализация данных, чтобы избежать циклических ссылок
    const serializedStudents = students.map(student => ({
      ...student,
      group: student.group ? {
        id: student.group.id,
        name: student.group.name,
        contacts: student.group.contacts,
      } : undefined,
    }));

    return new Response(JSON.stringify(serializedStudents), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET /api/students:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export async function POST(req: NextApiRequest): Promise<Response> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const student = await req.json();
    delete student['id'];
    const newStudent = await addStudentDb(student);

    console.log(newStudent);
    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in POST /api/students:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
