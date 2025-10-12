interface StudentInterface {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  group_id: Int16Array;
  isDeleted?: boolean;
};

export default StudentInterface;
