'use client'
import TodayAppointmentCard from '@/components/Appointments/TodayAppointmentCard'
import { useGetAppointmentsQuery } from '@/features/appointmentSlice';
import React from 'react'
import Loader from '@/components/Loader';

const TodayAppointmentView = () => {

  const {
    data: allAppointments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAppointmentsQuery();

  const currentDate = new Date();

  const isCurrentDateAppointment = (appointmentDate) => (
    currentDate.getDate() === appointmentDate.getDate() &&
    currentDate.getMonth() === appointmentDate.getMonth() &&
    currentDate.getFullYear() === appointmentDate.getFullYear()
  );

  return (
    <div className='m-2 rounded-lg p-6 bg-white shadow-2xl'>
      <div className='flex justify-between'>
        <h2 className='text-gray-600 font-bold'>Today Appointments</h2>
        <select className='w-20 bg-blue-600 px-4 py-2 text-white'>
          <option>Sort by</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
      {isLoading && (<Loader />)}
      {!isLoading && (
        allAppointments?.appointments
          .filter((appointment) =>
            appointment.status === 'accepted' &&
            isCurrentDateAppointment(new Date(appointment.date))
          )
          .map((filteredAppointment) => (
            <TodayAppointmentCard key={filteredAppointment.id} appointment={filteredAppointment} />
          ))
      )}

    </div>
  );
}

export default TodayAppointmentView;