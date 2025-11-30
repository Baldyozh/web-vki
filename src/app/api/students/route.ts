import { ensureInitialized } from '@/db/AppDataSource';
import { studentService } from '@/services/StudentService';
import { type NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  await ensureInitialized();
  const students = await studentService.getStudents();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(req: NextRequest): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const student = await req.json();
  delete student['id'];
  const newStudent = await studentService.addStudent(student);

  console.log(newStudent);
  return new Response(JSON.stringify(newStudent), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
