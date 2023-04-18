import { useDocumentTitle } from '@/hooks';
import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error: FC = () => {
  const error = useRouteError();
  console.error(error);
  useDocumentTitle('Ошибка');

  return (
    <>
      <h1>Упс!</h1>
      <p>Извините, произошла непредвиденная ошибка.</p>
      {isRouteErrorResponse(error) && (
        <p>
          <i>{error.statusText || error.data.message}</i>
        </p>
      )}
    </>
  );
};

export default Error;
