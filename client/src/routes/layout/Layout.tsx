import { clientUrls } from '@/constants/client-urls';
import { useGetApplicantQuery } from '@/store/api';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Step from './Step';

const steps = [
  { text: 'Основные данные', url: clientUrls.mainData },
  { text: 'Выбор курсов', url: clientUrls.courseChoice },
];

const Layout: FC = () => {
  const { data: applicant } = useGetApplicantQuery({});

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(applicant));
  }, [applicant]);

  return (
    <div className="container mx-auto px-4">
      <header>
        <nav className="font-semibold py-4">
          <ul className="flex gap-6">
            {steps.map((step, id) => (
              <Step key={step.url} url={step.url} text={step.text} number={id + 1} />
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
