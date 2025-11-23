'use client';

import Link from 'next/link';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  const modifier = student.isDeleted ? '--isDeleted' : student.isNew ? '--isNew' : '';
  const fullName = `${student.lastName} ${student.firstName} ${student.middleName}`;
  const groupName = student.group ? student.group.name : `ID: ${student.groupId}`;

  return (
    <div className={`${styles.Student} ${styles[modifier]}`}>
      <div className={styles.Student__info}>
        <Link href={`/students/${student.id}`} className={styles.Student__link}>
          {`${student.id || 'xxxx'} - ${fullName}`}
        </Link>
        <span className={styles.Student__group}>Группа: {groupName}</span>
      </div>
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;
