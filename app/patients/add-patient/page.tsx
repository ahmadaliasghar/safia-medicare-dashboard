'use client'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import { useAddPatientMutation } from '@/features/patientSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Patient } from '@/types';
import PatientForm from '../component/PatientForm';

const Page = () => {
 
  return (
    <>
      <div className="flex items-center w-full h-full m-4">
        <PatientForm/>
      </div>
    </>
  );
};

export default Page;
