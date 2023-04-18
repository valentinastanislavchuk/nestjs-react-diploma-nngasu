import { BaseProps } from '@/types';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

interface StepProps extends BaseProps {
  number: number;
  text: string;
  url: string;
}

const Step: FC<StepProps> = ({ url, text, number, className }) => {
  const { pathname } = useLocation();

  const numberBg = pathname === url ? 'bg-indigo-600' : 'bg-gray-400';
  const textColor = pathname === url ? 'text-indigo-600' : 'text-gray-400';
  return (
    <li className={`${className} flex gap-2`}>
      <p className={`${numberBg} rounded-full text-center w-6 h-6 text-white`}>{number}</p>
      <p className={textColor}>{text}</p>
    </li>
  );
};

export default Step;
