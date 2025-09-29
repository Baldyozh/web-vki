import { getStudentDb } from "@/db/studentDb";

export async function GET(): Promise<Response> {
  const students = await getStudentDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};