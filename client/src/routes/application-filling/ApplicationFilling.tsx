import { useDocumentTitle } from '@/hooks';
import { FC } from 'react';
import SubjectForm from './SubjectForm';

const ApplicationFilling: FC = () => {
  useDocumentTitle('Основные данные');

  return (
    <>
      <SubjectForm />
    </>
  );
};

export default ApplicationFilling;
