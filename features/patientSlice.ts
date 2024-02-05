import { Patient } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const patientSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<any, void>({
      query: () => "/patient",
      providesTags:['Patient']
    }),
    getPatient: builder.query({
      query: (id) => ({
        url: `/patient/${id}`,
        method: "GET",
      })
    }),
    addPatient: builder.mutation({
      query: (patient) => ({
        url: "/patient",
        method: "POST",
        body: patient,
      }),
      invalidatesTags:["Patient"]
    }),
    updatePatient: builder.mutation({
      query: ({ patientId, body }: { patientId: string; body: Patient }) => ({
        url: `/patient/${patientId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    deletePatient: builder.mutation({
      query: (id:string) => ({
        url: `/patient/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Patient"],
    })
  }),
});

export const { useGetPatientsQuery, useGetPatientQuery, useAddPatientMutation, useUpdatePatientMutation, useDeletePatientMutation } = patientSlice;
