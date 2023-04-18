import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { clientUrls } from './constants/client-urls';
import './index.css';
import { ApplicationFilling, Error, FacultyChoice, Layout } from './routes';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Navigate to={clientUrls.mainData} replace />,
      },
      {
        path: clientUrls.mainData,
        element: <ApplicationFilling />,
      },
      {
        path: clientUrls.courseChoice,
        element: <FacultyChoice />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
