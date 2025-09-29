'use client';

import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div>
      {students.map((student: StudentInterface) => (
        <h2 key={student.id}>
          {student.last_name}
        </h2>
      ))}
    </div>
  );
};

export default Students;