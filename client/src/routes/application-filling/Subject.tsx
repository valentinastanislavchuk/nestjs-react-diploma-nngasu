import { BaseProps, ExamResult, Subject as ISubject } from '@/types';
import { getLastYearRange } from '@/utils/datetime';
import { ChangeEventHandler, FC, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

const exam_years = getLastYearRange(5);

type FormValues = { [id: string]: ExamResult };

interface SubjectProps extends BaseProps, ISubject {
  form: UseFormReturn<FormValues>;
}

const Subject: FC<SubjectProps> = ({ _id, name, passing_score, form, className }) => {
  const checkbox = form.watch(`${_id}.checked`);

  useEffect(() => {
    if (checkbox) form.setFocus(`${_id}.score`);
    else form.setValue(`${_id}.score`, null!, { shouldValidate: true }); // eslint-disable-line
  }, [checkbox]);

  const onScoreChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value) form.setValue(`${_id}.checked`, true);
  };

  return (
    <>
      <div className={`${className} flex items-center gap-4 py-2 px-2`}>
        <label className="relative inline-flex items-center cursor-pointer">
          <input id={`name_${_id}`} type="checkbox" {...form.register(`${_id}.checked`)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <label htmlFor={`name_${_id}`} className="flex-1">
          {name}
        </label>
        <input
          id={`score_${_id}`}
          type="number"
          min={passing_score}
          max={100}
          {...form.register(`${_id}.score`, {
            required: checkbox && 'Пожалуйста, укажите Ваш балл за экзамен',
            min: { value: passing_score, message: `Проходной балл - ${passing_score}` },
            max: { value: 100, message: 'Максимальный балл не может превышать 100' },
            onChange: onScoreChange,
          })}
          className="shadow w-20 pl-2"
        />
        <label htmlFor={`score_${_id}`}>баллов</label>
        <select
          id={`exam-year_${_id}`}
          {...form.register(`${_id}.exam_year`, { required: checkbox })}
          className="bg-white shadow py-1 px-2"
        >
          {exam_years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <label htmlFor={`exam-year_${_id}`}>год сдачи</label>
      </div>
      {form.formState.errors?.[_id] && (
        <p className="text-red-600 mb-2 ml-2 text-sm align-text-top before:content-['⚠'] before:mr-3 before:text-lg">
          {form.formState.errors?.[_id]?.score?.message || 'Ошибка'}
        </p>
      )}
    </>
  );
};

export default Subject;
