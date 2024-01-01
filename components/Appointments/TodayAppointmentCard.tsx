import Image from 'next/image'
import PersonImage from "@/assets/images/Person.jpg"
import React from 'react'

const TodayAppointmentCard = () => {
  return (
    <div className='w-full border-red bg-white border m-2 min-h-32 rounded-lg border-gray-700 flex'>
        <div className='hidden lg:block'>
            <Image src={PersonImage} alt='person' height={110} width={150} className='h-full rounded-l-lg'/>
        </div>
        <div className='p-6 bg-slate-100 w-full'>
            <div className="flex justify-between items-center">
                <div className='flex gap-2 items-center'>
        <div className='lg:hidden'>
            <Image src={PersonImage} alt='person' height={55} width={55} className='rounded-full'/>
        </div>
                <p className='font-bold text-lg'>Amanda Chavez</p>
                </div>
                <p className='font-bold text-blue-500'>$ Price</p>
            </div>
            <div className="flex justify-between my-2 flex-wrap">
                <div>
                    <p className='text-gray-600'>Appointment ID</p>
                    <p># 123456</p>
                </div>
                <div>
                    <p className='text-gray-600'>Date</p>
                    <p>25 July, 2024</p>
                </div>
                <div>
                    <p className='text-gray-600'>Time</p>
                    <p>11:00 - 12:00</p>
                </div>
                <div>
                    <p className='text-gray-600'>Service</p>
                    <p>HairCut, Massage</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodayAppointmentCard