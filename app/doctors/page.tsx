'use client'
import { useGetDoctorsQuery } from '@/features/doctorSlice';
import Doctortable from '../../components/Table/DataTable'

const Page = () => {
  
  const {
    data: allDoctors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDoctorsQuery();

  return (
    <div className="mt-16 min-h-[100vh] bg-white m-4">
        <h1 className='text-light-primary text-2xl font-bold'>
          Doctor
        </h1>  
        <Doctortable data={allDoctors?.doctors} />
    </div>
  )
}

export default Page