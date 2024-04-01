'use client'
import { useGetDoctorsQuery } from '@/features/doctorSlice';
import Doctortable from '../../components/Table/DataTable'
import Link from 'next/link';
import ActionButton from '@/components/ActionButton';

const Page = () => {

  const {
    data: allDoctors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDoctorsQuery();

  return (
    <div className="m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded">
      {/* <h1 className='text-light-primary text-2xl font-bold'>
          Doctor
        </h1>  */}
      <div className="py-6 px-4 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black">
          Doctors
        </h4>
        <Link href={'/doctors/add'}>
          <ActionButton type="success">
            Add Doctor
          </ActionButton>
        </Link>

      </div>
      <Doctortable data={allDoctors?.doctors} />
    </div>
  )
}

export default Page