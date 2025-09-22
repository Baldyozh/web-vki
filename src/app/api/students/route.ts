import { getStudentDb } from "@/db/studentDb";

export async function GET(): Promise<Response> {
  const groups = await getStudentDb();

  return new Response(JSON.stringify(groups), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};