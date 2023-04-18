import { useDocumentTitle } from '@/hooks';
import { FC } from 'react';
import FacultyForm from './FacultyForm';

const FacultyChoice: FC = () => {
  useDocumentTitle('Выбор курсов');

  return (
    <>
      <FacultyForm />
    </>
  );
};

export default FacultyChoice;
