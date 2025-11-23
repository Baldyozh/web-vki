import type StudentInterface from '@/types/StudentInterface';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import useGroups from '@/hooks/useGroups';
import styles from './AddStudent.module.scss';

export type FormFields = Pick<StudentInterface, 'firstName' | 'lastName' | 'middleName' | 'groupId'>;

interface Props {
  onAdd: (studentForm: FormFields) => void;
}

const AddStudent = ({ onAdd }: Props): React.ReactElement => {
  const { groups } = useGroups();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>();

  useEffect(() => {
    if (groups.length > 0) {
      setValue('groupId', groups[0].id);
    }
  }, [groups, setValue]);

  const onSubmit: SubmitHandler<FormFields> = studentForm => onAdd(studentForm);

  return (
    <div className={styles.AddStudent}>
      <h2>Добавления студента</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="Фамилия"
          {...register('lastName', { required: true })}
        />
        {errors.lastName && <div>Обязательное поле</div>}

        <input
          placeholder="Имя"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <div>Обязательное поле</div>}

        <input
          placeholder="Отчество"
          {...register('middleName', { required: true })}
        />
        {errors.middleName && <div>Обязательное поле</div>}

        <select
          {...register('groupId', { required: true, valueAsNumber: true })}
        >
          {groups.length === 0 ? (
            <option value={0}>Нет доступных групп</option>
          ) : (
            groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))
          )}
        </select>
        {errors.groupId && <div>Обязательное поле</div>}

        <input type="submit" value="Добавить" />
      </form>

    </div>
  );
};

export default AddStudent;
