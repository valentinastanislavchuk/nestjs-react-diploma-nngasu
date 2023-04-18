import { configureStore } from '@reduxjs/toolkit';
import { applicantApi, subjectApi } from './api';

export const store = configureStore({
  reducer: {
    [subjectApi.reducerPath]: subjectApi.reducer,
    [applicantApi.reducerPath]: applicantApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(subjectApi.middleware, applicantApi.middleware),
});
