import React from 'react';
import PersonImage from "@/assets/images/Person.png";
import Image from 'next/image';
import { Appointment } from '@/types';

interface AcceptAppointmentCard {
    appointment: Appointment
}

const AcceptAppointmentCard: React.FC<AcceptAppointmentCard> = ({ appointment }) => {
    console.log(appointment, "app")


    return (
        <div className='w-full border-red bg-white border m-2 h-32 rounded-lg border-gray-700 flex'>
            <div>
                <Image src={PersonImage} alt='person' height={110} width={190} className='h-full rounded-l-lg' />
            </div>
            <div className='p-6 bg-slate-100 w-full'>
                <div className="flex justify-between">
                    <p className='font-bold text-lg text-black'>{appointment?.patient?.name}</p>
                    <div>
                        <p className='text-green-500 font-bold text-lg'>Accepted</p>
                    </div>
                </div>
                <div className="flex justify-between my-2">
                    <div>
                        <p className='text-gray-600 font-bold'>Appointment ID</p>
                        <p className='text-black'># {appointment?._id}</p>
                    </div>
                    <div>
                        <p className='font-bold  text-gray-600'>Doctor</p>
                        <p className='text-black'>{appointment?.doctor?.name}</p>
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
                        <p className='text-gray-600'>Service</p>
                        <p className='text-black'>{appointment?.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcceptAppointmentCard;