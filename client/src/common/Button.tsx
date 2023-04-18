import { BaseProps } from '@/types';
import { FC, PropsWithChildren } from 'react';

interface ButtonProps extends BaseProps {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  disabled = false,
  type = 'button',
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} shadow py-1.5 px-3 rounded-md bg-emerald-600 text-white disabled:bg-slate-400`}
    >
      {children}
    </button>
  );
};
