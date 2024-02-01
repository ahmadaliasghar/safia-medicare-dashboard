import { apiSlice } from "./api/apiSlice";

export const doctorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<any, void>({
      query: () => "/doctor",
      providesTags: ['Doctor']
    }),
    addDoctor: builder.mutation({
      query: (patient) => ({
        url: "/doctor",
        method: "POST",
        body: patient,
      }),
      invalidatesTags:["Doctor"]
    }),
  }),
});

export const { useGetDoctorsQuery, useAddDoctorMutation } = doctorSlice;
