import { createSlice } from '@reduxjs/toolkit/query/react';

const apiSlice = createSlice({
  name: 'appointment',
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => 'your/api/endpoint',
    }),
  }),
});

export const { useFetchDataQuery } = apiSlice;
