import { getGroupsDb } from '@/db/groupDb';

export async function GET(): Promise<Response> {
  try {
    const groups = await getGroupsDb();

    // Сериализация данных, чтобы избежать циклических ссылок
    const serializedGroups = groups.map(group => ({
      ...group,
      students: group.students ? group.students.map(student => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        middleName: student.middleName,
        contacts: student.contacts,
        groupId: student.groupId,
      })) : [],
    }));

    return new Response(JSON.stringify(serializedGroups), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in GET /api/groups:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
