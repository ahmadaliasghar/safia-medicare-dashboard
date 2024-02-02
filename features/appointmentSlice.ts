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
      invalidatesTags: ["Appointment"]
    }),
    acceptAppointment: builder.mutation({
      query: ({ appointmentId }) => ({
        url: `/appointment/${appointmentId}/accepted`, // Assuming you have an accept endpoint in your backend
        method: "PATCH",
      }),
      invalidatesTags: ["Appointment"]
    }),
    rejectAppointment: builder.mutation({
      query: ({ appointmentId }) => ({
        url: `/appointment/${appointmentId}/rejected`, // Assuming you have a reject endpoint in your backend
        method: "PATCH",
      }),
      invalidatesTags: ["Appointment"]
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useAcceptAppointmentMutation,
  useRejectAppointmentMutation,
} = appointmentSlice;
