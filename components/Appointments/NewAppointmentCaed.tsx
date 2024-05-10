'use client'
import React from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import PersonImage from '@/assets/images/Person.png';
import ActionButton from '../ActionButton';
import { useUpdateAppointmentMutation } from '@/features/appointmentSlice';
import { Appointment, Person } from '@/types';

interface NewAppointmentCardProps {
  appointment: Appointment;
}

const NewAppointmentCard: React.FC<NewAppointmentCardProps> = ({ appointment }) => {
  const [updateAppointment] = useUpdateAppointmentMutation();

  const currentDate = new Date();
  const appointmentDate = new Date(appointment.date);

  const isCurrentDateAppointment =
    currentDate.getDate() === appointmentDate.getDate() &&
    currentDate.getMonth() === appointmentDate.getMonth() &&
    currentDate.getFullYear() === appointmentDate.getFullYear();

  if (isCurrentDateAppointment) {
    return null; // Don't render the appointment card if it's for the current date
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    const confirmText = status === 'accepted' ? 'accept' : 'reject';
    const result = await Swal.fire({
      title: `Are you sure you want to ${confirmText} this appointment?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      try {
        await updateAppointment({ appointmentId: id, body: { status } }).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Appointment Updated',
        });
      } catch (err) {
        console.error('Error updating appointment:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update appointment status',
        });
      }
    }
  };

  return (
    <div className="w-full border-red bg-white border m-2 h-32 rounded-lg border-gray-700 flex">
      <div>
        <Image src={PersonImage} alt="person" height={110} width={190} className="h-full rounded-l-lg" />
      </div>
      <div className="p-6 bg-slate-100 w-full">
        <div className="flex justify-between">
          <p className="font-bold text-lg text-black">{(appointment.patient as Person)?.name}</p>
          <div>
            <ActionButton type="success" onClick={() => handleUpdateStatus(appointment._id, 'accepted')}>
              Accept
            </ActionButton>
            <ActionButton onClick={() => handleUpdateStatus(appointment._id, 'rejected')}>Reject</ActionButton>
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div>
            <p className="text-gray-600 font-bold">Appointment ID</p>
            <p className="text-black">#{appointment._id}</p>
          </div>
          <div>
            <p className="text-gray-600 font-bold">Date</p>
            <p className="text-black">{appointment.date}</p>
          </div>
          <div>
            <p className="text-gray-600 font-bold">Time</p>
            <p className="text-black">{appointment.time}</p>
          </div>
          <div>
            <p className="text-gray-600 font-bold">Service</p>
            <p className="text-black">{appointment.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentCard;
