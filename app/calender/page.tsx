'use client'
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useGetAppointmentsQuery } from '@/features/appointmentSlice';

export default function Page() {
  const { data: appointmentsData } = useGetAppointmentsQuery();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (appointmentsData && Array.isArray(appointmentsData.appointments)) {
      const formattedAppointments = appointmentsData.appointments.map(appointment => ({
        title: appointment.title,
        start: `${appointment.date}T${appointment.time}`,
      }));
      setAppointments(formattedAppointments);
    }
  }, [appointmentsData]);


  return (
    <div className='m-4'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={appointments}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className='bg-blue-500'>
      <b className="text-white">{eventInfo.timeText}</b>
      <i className="text-white">{eventInfo.event.title}</i>
    </div>
  );
}

