import { Button } from '@/common';
import { clientUrls } from '@/constants/client-urls';
import { isApiResponse } from '@/helpers/is-api-response';
import { useAddSubjectsMutation, useGetSubjectsQuery } from '@/store/api';
import { BaseProps, ExamResult, Subject as ISubject } from '@/types';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Subject from './Subject';

type FormValues = { [id: string]: ExamResult };

const SubjectForm: FC<BaseProps> = ({ className }) => {
  const navigate = useNavigate();
  const { data: subjects = [], error: subjectsError, isFetching } = useGetSubjectsQuery({});
  const [addSubjects] = useAddSubjectsMutation();
  const form = useForm<FormValues>({
    mode: 'all',
    values: JSON.parse(localStorage.getItem('subjects') || '{}'),
  });

  const isFormFilled = () => {
    const subjects = Object.values(form.getValues());
    return subjects.some((subject: ExamResult) => !!subject.checked && !!subject.score);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const subjectsToSend = Object.entries(data)
      .filter(([_, subject]: [string, ExamResult]) => subject.checked) // eslint-disable-line
      .map(([id, subject]: [string, ExamResult]) => ({ ...subject, subject: id }));
    await addSubjects(subjectsToSend).unwrap();
    localStorage.setItem('subjects', JSON.stringify(data));
    navigate(clientUrls.courseChoice);
  };

  if (isApiResponse(subjectsError)) return <div>Упс, произошла ошибка: {subjectsError.data.message}</div>;
  if (isFetching) return <div>Загрузка...</div>;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={`${className} max-w-xl`}>
      <p className="text-sm my-2">Я уже сдавал(а) или буду сдавать ЕГЭ по предметам</p>
      {subjects.map((subject: ISubject) => (
        <Subject key={subject._id} {...subject} form={form} />
      ))}
      <Button type="submit" disabled={!form.formState.isValid || !isFormFilled()} className="my-3">
        Далее
      </Button>
    </form>
  );
};

export default SubjectForm;
