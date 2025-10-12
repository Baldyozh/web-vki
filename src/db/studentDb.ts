import sqlite3 from 'sqlite3';

import type StudentInterface from '@/types/StudentInterface';

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
export const addStudentDb = async (student: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const result = await new Promise<StudentInterface>((resolve, reject) => {
    const sql = 'INSERT INTO student (first_name, last_name, middle_name, groupId) VALUES (?, ?, ?, ?)';
    db.run(sql, [student.first_name, student.last_name, student.middle_name, student.group_id], function (err) {
      if (err) {
        db.close();
        return reject(err);
      }
      const newStudent: StudentInterface = {
        id: this.lastID,
        first_name: student.first_name,
        last_name: student.last_name,
        middle_name: student.middle_name,
        group_id: student.group_id,
      };
      db.close();
      resolve(newStudent);
    });
  });

  return result;
};

export const removeStudentById = async (id: number): Promise<boolean> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const result = await new Promise<boolean>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        db.close();
        return reject(err);
      }
      const changes = (this && (this as any).changes) || 0;
      db.close();
      resolve(changes > 0);
    });
  });

  return result;
};
