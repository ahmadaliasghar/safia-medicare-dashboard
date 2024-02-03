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
      query: ({ appointmentId, body }: { appointmentId: string | null; body: { status: string } }) => ({
        url: `/appointment/${appointmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Appointment"],
    }),
    deleteAppointment: builder.mutation({
      query: (id:string) => ({
        url: `/appointment/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Appointment"],
    })
  }),
});

export const {
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation
} = appointmentSlice;
