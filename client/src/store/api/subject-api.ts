import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { subjectApiUrls } from './constants/api-urls';

export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
  endpoints: (build) => ({
    getSubjects: build.query({
      query: () => subjectApiUrls.getSubjects,
    }),
  }),
});

export const { useGetSubjectsQuery } = subjectApi;
