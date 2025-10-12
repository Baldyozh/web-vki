import { getStudentDb, addStudentDb, removeStudentById } from '@/db/studentDb';
import { NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const students = await getStudentDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { first_name, last_name, middle_name, group_id } = body;

    if (!first_name || !last_name) {
      return new Response(JSON.stringify({ error: 'First name and last name are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const student = await addStudentDb({
      first_name,
      last_name,
      middle_name: middle_name || '',
      group_id: group_id || 0,
    });

    return new Response(JSON.stringify(student), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create student' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Student ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const success = await removeStudentById(parseInt(id));

    if (!success) {
      return new Response(JSON.stringify({ error: 'Student not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete student' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
