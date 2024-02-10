'use client'
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useGetAppointmentsQuery } from '@/features/appointmentSlice';

export default function Page() {
  const { data: appointmentsData } = useGetAppointmentsQuery();
  const [appointments, setAppointments] = useState([]);

  console.log(appointmentsData, 'data')
  useEffect(() => {
    if (appointmentsData && Array.isArray(appointmentsData.appointments)) {
      const formattedAppointments = appointmentsData?.appointments
        ?.filter(appointment => appointment.status !== 'rejected')
        .map(appointment => ({
          title: appointment.title,
          start: `${appointment.date}T${appointment.time}`,
          status: appointment.status
        }));
      setAppointments(formattedAppointments);
    }
  }, [appointmentsData]);


  return (
    <div className='m-4'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={appointments}
        eventContent={renderEventContent}
        eventClassNames={handleEventClassNames}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div>
      <b className="mr-2">{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}

function handleEventClassNames(arg) {
  const { status } = arg.event.extendedProps;
  let classNames = '';

  if (status === 'pending') {
    classNames += ' bg-blue-500 text-white';
  } else if (status === 'accepted') {
    classNames += ' bg-green-500 text-white';
  }

  return classNames;
}