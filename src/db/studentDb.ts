import sqlite3 from 'sqlite3';

import StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });


  return students as StudentInterface[];
};
