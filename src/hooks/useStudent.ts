import { useQuery } from '@tanstack/react-query';
import { getStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentHookInterface {
  student: StudentInterface | undefined;
  isLoading: boolean;
  error: Error | null;
}

const useStudent = (studentId: number): StudentHookInterface => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentApi(studentId),
    enabled: !!studentId && studentId > 0,
  });

  return {
    student: data,
    isLoading,
    error: error as Error | null,
  };
};

export default useStudent;

