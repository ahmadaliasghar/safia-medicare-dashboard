'use client'
import TodayAppointmentCard from '@/components/Appointments/TodayAppointmentCard'
import { useGetAppointmentsQuery } from '@/features/appointmentSlice';
import React from 'react'

const TodayAppointmentView = () => {
  
  const {
    data: allAppointments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAppointmentsQuery();

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
        {allAppointments?.appointments?.map((appointment) => (
        <TodayAppointmentCard appointment={appointment} />
        ))}
    </div>
  )
}

export default TodayAppointmentView