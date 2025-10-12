import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentsApi, addStudentApi, deleteStudentApi } from '@/api/studentApi';

import StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  addStudent: (student: Omit<StudentInterface, 'id'>) => Promise<StudentInterface>;
  deleteStudent: (id: number) => Promise<boolean>;
  isLoading: boolean;
  isAdding: boolean;
  isDeleting: boolean;
  refetch: () => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: true,
  });

  const addStudentMutation = useMutation({
    mutationFn: addStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const addStudent = async (student: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
    return addStudentMutation.mutateAsync(student);
  };

  const deleteStudent = async (id: number): Promise<boolean> => {
    return deleteStudentMutation.mutateAsync(id);
  };

  return {
    students: data ?? [],
    addStudent,
    deleteStudent,
    isLoading,
    isAdding: addStudentMutation.isPending,
    isDeleting: deleteStudentMutation.isPending,
    refetch,
  };
};

export default useStudents;