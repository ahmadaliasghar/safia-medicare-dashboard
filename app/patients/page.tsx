'use client'
import Loader from '@/components/Loader';
import PatientTable from '@/components/Table/PatientTable';
import { useGetPatientsQuery } from '@/features/patientSlice';
import React from 'react'

const Page = () => {
    
  const {
    data: allPatients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery();

  return (
    <div className='m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded'>
        {isLoading && (<Loader style="items-center h-[70vh]" />)}
        {!isLoading && (
        <PatientTable data={allPatients?.patients} />
        )}
    </div>
  )
}

export default Page