import { Diagnose, Patient } from "@/types";
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
    getPatientDiagnosis: builder.query({
      query: (id) => ({
        url: `/diagnose/${id}`,
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
    addPatientDiagnosis: builder.mutation({
      query: ({ patientId, body }: { patientId: string; body: Diagnose }) => ({
        url: `/diagnose/${patientId}`,
        method: "POST",
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

export const { useGetPatientsQuery, useGetPatientQuery, useAddPatientMutation, useUpdatePatientMutation, useDeletePatientMutation, useGetPatientDiagnosisQuery, } = patientSlice;
