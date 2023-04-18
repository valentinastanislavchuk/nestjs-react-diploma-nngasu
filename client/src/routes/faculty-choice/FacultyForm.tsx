import { Button } from '@/common';
import { isApiResponse } from '@/helpers/is-api-response';
import { useGetFacultiesQuery } from '@/store/api';
import { AvailableFaculty, BaseProps } from '@/types';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Faculty from './Faculty';

const FacultyForm: FC<BaseProps> = ({ className }) => {
  const navigate = useNavigate();
  const { data: faculties = [], error: facultiesError, isFetching } = useGetFacultiesQuery({});

  if (isApiResponse(facultiesError)) return <div>Упс, произошла ошибка: {facultiesError.data.message}</div>;
  if (isFetching) return <div>Загрузка...</div>;

  return (
    <div className={`${className} max-w-3xl`}>
      {faculties.map(({ faculty, success_chance }: AvailableFaculty) => (
        <Faculty key={faculty._id} success_chance={success_chance} {...faculty} />
      ))}
      <Button onClick={() => navigate(-1)} className="my-3">
        Назад
      </Button>
    </div>
  );
};

export default FacultyForm;
