'use client'
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useGetAppointmentsQuery } from '@/features/appointmentSlice';
import Modal from './Model';

export default function Page() {
  const { data: appointmentsData } = useGetAppointmentsQuery();
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (appointmentsData && Array.isArray(appointmentsData.appointments)) {
      console.log(appointmentsData,"data on calander")
      const formattedAppointments = appointmentsData?.appointments
        ?.filter(appointment => appointment.status !== 'rejected')
        .map(appointment => ({
          title: appointment.title,
          start: `${appointment.date}T${appointment.time}`,
          status: appointment?.status
        }));
      setAppointments(formattedAppointments);
    }
  }, [appointmentsData]);

  const handleDateSelect = (info) => {
    console.log(info, 'data')
    // setSelectedDate(info.startStr);
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const handleEventMouseEnter = (arg) => {
    arg.el.style.backgroundColor = 'grey';
    arg.el.style.cursor = 'pointer';
  };

  const handleEventMouseLeave = (arg) => {
    arg.el.style.backgroundColor = ''; // Revert to default background color
  };

  return (
    <div className='m-4'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={appointments}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleDateSelect}
        eventContent={renderEventContent}
        eventClassNames={handleEventClassNames}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventData={selectedEvent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  console.log(eventInfo,"time")
  return (
    <div>
      <b className="mr-2">{eventInfo?.timeText}</b>
      <i>{eventInfo.event?.title}</i>
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
