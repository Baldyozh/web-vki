'use client';

import { useParams } from 'next/navigation';
import useStudent from '@/hooks/useStudent';
import StudentDetail from '@/components/Students/StudentDetail/StudentDetail';
import Page from '@/components/layout/Page/Page';

const StudentPage = (): React.ReactNode => {
  const params = useParams();
  const studentId = parseInt(params.id as string, 10);
  const { student, isLoading, error } = useStudent(studentId);

  if (isLoading) {
    return (
      <Page>
        <div>Загрузка...</div>
      </Page>
    );
  }

  if (error || !student) {
    return (
      <Page>
        <div>Студент не найден</div>
      </Page>
    );
  }

  return (
    <Page>
      <StudentDetail student={student} />
    </Page>
  );
};

export default StudentPage;

