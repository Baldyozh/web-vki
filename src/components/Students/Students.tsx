'use client';

import { useState } from 'react';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';
import AddStudent from './AddStudent';
import Student from './Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudent, isLoading, isDeleting, refetch } = useStudents();
  const [deletingId, setDeletingId] = useState<number | null>(null);


  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого студента?')) {
      try {
        setDeletingId(id);
        await deleteStudent(id);
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Ошибка при удалении студента');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <AddStudent />
      
      <div style={{ marginTop: '20px' }}>
        <h2>Список студентов ({students.length})</h2>
        {students.length === 0 ? (
          <p>Студенты не найдены</p>
        ) : (
          <div>
            {students.map((student: StudentInterface) => (
              <Student
                key={student.id}
                student={student}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;