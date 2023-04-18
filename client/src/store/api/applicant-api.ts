import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { applicantApiUrls } from './constants/api-urls';

export const applicantApi = createApi({
  reducerPath: 'applicantApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
  tagTypes: ['Faculties'],
  endpoints: (build) => ({
    getApplicant: build.query({
      query: () => applicantApiUrls.getApplicant,
    }),
    getFaculties: build.query({
      query: () => applicantApiUrls.getFaculties,
      providesTags: ['Faculties'],
    }),
    addSubjects: build.mutation({
      query: (body) => ({
        url: applicantApiUrls.addSubjects,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Faculties'],
    }),
  }),
});

export const { useGetApplicantQuery, useGetFacultiesQuery, useAddSubjectsMutation } = applicantApi;
