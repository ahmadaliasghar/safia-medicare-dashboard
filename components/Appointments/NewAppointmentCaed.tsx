import React from 'react';
import ActionButton from '../ActionButton';
import PersonImage from "@/assets/images/Person.png";
import Image from 'next/image';
import { useAcceptAppointmentMutation, useRejectAppointmentMutation } from '@/features/appointmentSlice';


const NewAppointmentCard = ({ appointment }) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);

    const isCurrentDateAppointment = (
        currentDate.getDate() === appointmentDate.getDate() &&
        currentDate.getMonth() === appointmentDate.getMonth() &&
        currentDate.getFullYear() === appointmentDate.getFullYear()
    );


    if (isCurrentDateAppointment) {
        return null;
    }
    const [acceptMutation, acceptMutationState] = useAcceptAppointmentMutation();
    const [rejectMutation, rejectMutationState] = useRejectAppointmentMutation();

    const handleAccept = async () => {
        await acceptMutation.mutate({ appointmentId: appointment._id });
    };

    const handleReject = async () => {
        await rejectMutation.mutate({ appointmentId: appointment._id });
    };

    return (
        <div className='w-full border-red bg-white border m-2 h-32 rounded-lg border-gray-700 flex'>
            <div>
                <Image src={PersonImage} alt='person' height={110} width={190} className='h-full rounded-l-lg' />
            </div>
            <div className='p-6 bg-slate-100 w-full'>
                <div className="flex justify-between">
                    <p className='font-bold text-lg text-black'>{appointment?.patient?.name}</p>
                    <div>
                        <ActionButton type="success" onClick={handleAccept} disabled={acceptMutationState.isLoading}>
                            Accept
                        </ActionButton>
                        <ActionButton onClick={handleReject} disabled={rejectMutationState.isLoading}>
                            Reject
                        </ActionButton>
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
    );
}

export default NewAppointmentCard;
