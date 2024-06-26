import Image from 'next/image'
import PersonImage from "@/assets/images/Person.png"
import React from 'react'
import { Appointment } from '@/types'

interface TodayAppointmentCardProps {
    appointment: Appointment
}

const TodayAppointmentCard:React.FC<TodayAppointmentCardProps> = ({appointment}) => {
    
//   const currentDate = new Date();
//   const appointmentDate = new Date(appointment.date);

//   const isTodayAppointment = (
//     currentDate.getDate() === appointmentDate.getDate() &&
//     currentDate.getMonth() === appointmentDate.getMonth() &&
//     currentDate.getFullYear() === appointmentDate.getFullYear()
//   );

//   if (!isTodayAppointment) {
//     return null;
//   }

  return (
    <div className='w-full border-red bg-white border m-2 min-h-32 rounded-lg border-gray-700 flex'>
        <div className='hidden lg:block'>
            <Image src={PersonImage} alt='person' height={110} width={190} className='h-full rounded-l-lg'/>
        </div>
        <div className='p-6 bg-slate-100 w-full'>
            <div className="flex justify-between items-center">
                <div className='flex gap-2 items-center'>
        <div className='lg:hidden'>
            <Image src={PersonImage} alt='person' height={55} width={55} className='rounded-full'/>
        </div>
                <p className='font-bold text-lg text-black'>{appointment?.patient?.name}</p>
                </div>
                <p className='font-bold text-blue-500'>$ Price</p>
            </div>
            <div className="flex justify-between my-2 flex-wrap">
                <div>
                    <p className='text-gray-600 font-bold'>Appointment ID</p>
                    <p className='text-black'># {appointment?._id}</p>
                </div>
                <div>
                    <p className='text-gray-600 font-bold'>Date</p>
                    <p className='text-black'>{appointment?.date}</p>
                </div>
                <div>
                    <p className='text-gray-600 font-bold'>Time</p>
                    <p className='text-black'>{appointment?.time}</p>
                </div>
                <div>
                    <p className='text-gray-600 font-bold'>Service</p>
                    <p className='text-black'>{appointment?.title}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodayAppointmentCard