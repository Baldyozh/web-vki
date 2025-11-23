import type GroupInterface from './GroupInterface';

interface StudentInterface {
  id: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  contacts?: string;
  groupId: number;
  group?: GroupInterface;
  isDeleted?: boolean;
  isNew?: boolean;
};

export default StudentInterface;
