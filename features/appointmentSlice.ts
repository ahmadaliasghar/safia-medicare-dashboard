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
    updateAppointment: builder.mutation({
      query: ({ appointmentId, body }: { appointmentId: string; body: { status: string } }) => ({
        url: `/appointment/${appointmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
} = appointmentSlice;
