import { deleteStudentDb, getStudentByIdDb } from '@/db/studentDb';
import { type NextApiRequest } from 'next/types';

interface Params {
  params: { id: string };
}

export async function GET(req: NextApiRequest, { params }: Params): Promise<Response> {
  try {
    const p = await params;
    const studentId = parseInt(await p.id, 10);
    
    if (isNaN(studentId)) {
      return new Response(JSON.stringify({ error: 'Invalid student ID' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const student = await getStudentByIdDb(studentId);

    if (!student) {
      return new Response(JSON.stringify({ error: 'Student not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Сериализация данных, чтобы избежать циклических ссылок
    const serializedStudent = {
      ...student,
      group: student.group ? {
        id: student.group.id,
        name: student.group.name,
        contacts: student.group.contacts,
      } : undefined,
    };

    return new Response(JSON.stringify(serializedStudent), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET /api/students/[id]:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(req: NextApiRequest, { params }: Params): Promise<Response> {
  try {
    const p = await params;
    const studentId = parseInt(await p.id, 10);
    
    if (isNaN(studentId)) {
      return new Response(JSON.stringify({ error: 'Invalid student ID' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const deletedStudentId = await deleteStudentDb(studentId);

    return new Response(JSON.stringify({ deletedStudentId }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in DELETE /api/students/[id]:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
