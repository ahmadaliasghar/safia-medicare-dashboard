import React from 'react'
import ActionButton from '../ActionButton'
import PersonImage from "@/assets/images/Person.png"
import Image from 'next/image'

const NewAppointmentCard = ({appointment}) => {
  return (
    <div className='w-full border-red bg-white border m-2 h-32 rounded-lg border-gray-700 flex'>
        <div>
            <Image src={PersonImage} alt='person' height={110} width={190} className='h-full rounded-l-lg'/>
        </div>
        <div className='p-6 bg-slate-100 w-full'>
            <div className="flex justify-between">
            <p className='font-bold text-lg text-black'>{appointment?.patient?.name}</p>
                <div>
                    <ActionButton type="success">Accept</ActionButton>
                    <ActionButton>Reject</ActionButton>
                </div>
            </div>
            <div className="flex justify-between my-2">
            <div>
                    <p className='text-gray-600'>Appointment ID</p>
                    <p className='text-black'># {appointment?._id}</p>
                </div>
                <div>
                    <p className='text-gray-600'>Date</p>
                    <p className='text-black'>{appointment?.date}</p>
                </div>
                <div>
                    <p className='text-gray-600'>Time</p>
                    <p className='text-black'>{appointment?.time}</p>
                </div>
                <div>
                    <p className='text-gray-600'>Service</p>
                    <p className='text-black'>{appointment?.title}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewAppointmentCard