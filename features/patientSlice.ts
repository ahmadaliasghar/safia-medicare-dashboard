import { apiSlice } from "./api/apiSlice";

export const patientSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<any, void>({
      query: () => "/patient",
      providesTags: ['Patient']
    }),
    addPatient: builder.mutation({
      query: (patient) => ({
        url: "/patient",
        method: "POST",
        body: patient,
      }),
      invalidatesTags:["Patient"]
    }),
  }),
});

export const { useGetPatientsQuery, useAddPatientMutation } = patientSlice;
