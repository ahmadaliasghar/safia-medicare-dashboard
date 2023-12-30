import TodayAppointmentCard from '@/components/Appointments/TodayAppointmentCard'
import React from 'react'

const TodayAppointmentView = () => {
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
        <TodayAppointmentCard/>
        <TodayAppointmentCard/>
        <TodayAppointmentCard/>
        <TodayAppointmentCard/>
    </div>
  )
}

export default TodayAppointmentView