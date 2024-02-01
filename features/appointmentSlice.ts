import { apiSlice } from "./api/apiSlice";

export const appointmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<any, void>({
      query: () => "/appointment",
      providesTags: ['Appointment']
    }),
    addAppointment: builder.mutation({
      query: (patient) => ({
        url: "/appointment",
        method: "POST",
        body: patient,
      }),
      invalidatesTags:["Appointment"]
    }),
  }),
});

export const { useGetAppointmentsQuery, useAddAppointmentMutation } = appointmentSlice;
