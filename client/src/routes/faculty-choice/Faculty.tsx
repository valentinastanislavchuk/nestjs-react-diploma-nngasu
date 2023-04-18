import { BaseProps, Faculty as IFaculty } from '@/types';
import { FC } from 'react';

interface FacultyProps extends BaseProps, IFaculty {
  success_chance: number;
}

const Faculty: FC<FacultyProps> = ({ code, name, education_form, success_chance, className }) => {
  return (
    <div className={`${className} flex gap-4 py-2 px-2`}>
      <p>{code}</p>
      <p className="flex-1">{name}</p>
      <p>{education_form}</p>
      <p>Шанс: {Math.round(success_chance * 100)}%</p>
    </div>
  );
};

export default Faculty;
