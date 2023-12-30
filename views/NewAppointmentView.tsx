import NewAppointmentCard from '@/components/Appointments/NewAppointmentCaed'
import TodayAppointmentCard from '@/components/Appointments/TodayAppointmentCard'
import ToggleButton from '@/components/ToggleButton'
import React from 'react'

const NewAppointmentView = () => {
  return (
    <div className='m-2 rounded-lg p-6 bg-white shadow-2xl'>
        <div className='flex justify-between'>
            <h2 className='text-gray-600 font-bold'>New Appointments</h2>
            <ToggleButton/>
        </div>
        <NewAppointmentCard/>
        <NewAppointmentCard/>
        <NewAppointmentCard/>
        <NewAppointmentCard/>
    </div>
  )
}

export default NewAppointmentView