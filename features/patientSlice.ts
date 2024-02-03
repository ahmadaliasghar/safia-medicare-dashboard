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
    updatePatient: builder.mutation({
      query: ({ patientId, body }: { patientId: string | null; body: { status: string } }) => ({
        url: `/patient/${patientId}`,
        method: "PATCH",
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

export const { useGetPatientsQuery, useAddPatientMutation, useUpdatePatientMutation, useDeletePatientMutation } = patientSlice;
