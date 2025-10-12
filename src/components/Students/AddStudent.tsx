'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';

interface AddStudentFormData {
  first_name: string;
  last_name: string;
  middle_name: string;
  group_id: number;
}

const AddStudent = (): React.ReactElement => {
  const { addStudent, isAdding } = useStudents();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddStudentFormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      middle_name: '',
      group_id: 0,
    },
  });

  const onSubmit = async (data: AddStudentFormData) => {
    try {
      setError(null);
      await addStudent(data);
      reset();
      setIsFormVisible(false);
    } catch (err) {
      setError('Ошибка при добавлении студента');
      console.error('Error adding student:', err);
    }
  };

  if (!isFormVisible) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setIsFormVisible(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Добавить студента
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>Добавить нового студента</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="first_name" style={{ display: 'block', marginBottom: '5px' }}>
            Имя *
          </label>
          <input
            {...register('first_name', { required: 'Имя обязательно' })}
            type="text"
            id="first_name"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.first_name && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="last_name" style={{ display: 'block', marginBottom: '5px' }}>
            Фамилия *
          </label>
          <input
            {...register('last_name', { required: 'Фамилия обязательна' })}
            type="text"
            id="last_name"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.last_name && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="middle_name" style={{ display: 'block', marginBottom: '5px' }}>
            Отчество
          </label>
          <input
            {...register('middle_name')}
            type="text"
            id="middle_name"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="group_id" style={{ display: 'block', marginBottom: '5px' }}>
            ID группы
          </label>
          <input
            {...register('group_id', { valueAsNumber: true })}
            type="number"
            id="group_id"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={isAdding}
            style={{
              padding: '10px 20px',
              backgroundColor: isAdding ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAdding ? 'not-allowed' : 'pointer',
            }}
          >
            {isAdding ? 'Добавление...' : 'Добавить'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsFormVisible(false);
              reset();
              setError(null);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;

