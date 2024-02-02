'use client'
import NewAppointmentCard from '@/components/Appointments/NewAppointmentCaed'
import TodayAppointmentCard from '@/components/Appointments/TodayAppointmentCard'
import Loader from '@/components/Loader'
import ToggleButton from '@/components/ToggleButton'
import { useGetAppointmentsQuery } from '@/features/appointmentSlice'
import React from 'react'

const NewAppointmentView = () => {
  
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
            <h2 className='text-gray-600 font-bold'>New Appointments</h2>
            <ToggleButton/>
        </div>
        {isLoading && (<Loader/>)}
        {!isLoading && (allAppointments?.appointments?.map((appointment) => (
        <NewAppointmentCard appointment={appointment} />
        )))}
    </div>
  )
}

export default NewAppointmentView