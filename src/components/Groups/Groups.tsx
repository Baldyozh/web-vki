'use client';

import Link from 'next/link';
import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <div key={group.id} className={styles.Groups__group}>
          <h2 className={styles.Groups__title}>{group.name}</h2>
          {group.contacts && (
            <p className={styles.Groups__contacts}>Контакты: {group.contacts}</p>
          )}
          {group.students && group.students.length > 0 ? (
            <div className={styles.Groups__students}>
              <h3 className={styles.Groups__studentsTitle}>Студенты ({group.students.length}):</h3>
              <ul className={styles.Groups__studentsList}>
                {group.students.map((student) => (
                  <li key={student.id} className={styles.Groups__student}>
                    <Link href={`/students/${student.id}`} className={styles.Groups__studentLink}>
                      {`${student.lastName} ${student.firstName} ${student.middleName}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className={styles.Groups__noStudents}>Нет студентов в группе</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Groups;
