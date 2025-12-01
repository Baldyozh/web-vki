'use client';

import type StudentInterface from '@/types/StudentInterface';
import BackButton from '@/components/layout/BackButton/BackButton';
import styles from './StudentDetail.module.scss';

interface Props {
  student: StudentInterface;
}

const StudentDetail = ({ student }: Props): React.ReactElement => {
  const fullName = `${student.lastName} ${student.firstName} ${student.middleName}`.trim();

  return (
    <div className={styles.StudentDetail}>
      <BackButton href="/students" />
      
      <div className={styles.StudentDetail__content}>
        <h1>{fullName}</h1>
        
        <div className={styles.StudentDetail__info}>
          <div className={styles.StudentDetail__field}>
            <span className={styles.StudentDetail__label}>ID:</span>
            <span className={styles.StudentDetail__value}>{student.id}</span>
          </div>

          <div className={styles.StudentDetail__field}>
            <span className={styles.StudentDetail__label}>Фамилия:</span>
            <span className={styles.StudentDetail__value}>{student.lastName}</span>
          </div>

          <div className={styles.StudentDetail__field}>
            <span className={styles.StudentDetail__label}>Имя:</span>
            <span className={styles.StudentDetail__value}>{student.firstName}</span>
          </div>

          <div className={styles.StudentDetail__field}>
            <span className={styles.StudentDetail__label}>Отчество:</span>
            <span className={styles.StudentDetail__value}>{student.middleName}</span>
          </div>

          {student.contacts && (
            <div className={styles.StudentDetail__field}>
              <span className={styles.StudentDetail__label}>Контакты:</span>
              <span className={styles.StudentDetail__value}>{student.contacts}</span>
            </div>
          )}

          <div className={styles.StudentDetail__field}>
            <span className={styles.StudentDetail__label}>Группа:</span>
            <span className={styles.StudentDetail__value}>
              {student.group ? student.group.name : `ID: ${student.groupId}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

