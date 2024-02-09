'use client'
import AcceptAppointmentCard from '@/components/Appointments/AcceptAppointmentCard'
import Loader from '@/components/Loader'
import ToggleButton from '@/components/ToggleButton'
import { useGetAppointmentsQuery } from '@/features/appointmentSlice'
import React from 'react'

const AcceptAppointmentView = () => {

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
                {/* <h2 className='text-gray-600 font-bold'>Accepted Appointments</h2> */}
            </div>
            {isLoading && (<Loader />)}
            {!isLoading && (
                allAppointments?.appointments
                    ?.filter((appointment) => appointment.status === 'accepted')
                    .map((filteredAppointment) => (
                        <AcceptAppointmentCard key={filteredAppointment?.id} appointment={filteredAppointment} />
                    ))
            )}
        </div>
    )
}

export default AcceptAppointmentView