import React from 'react'
import ServiceForm from '../ServiceForm' 

const Page = () => {
  return (
    <div className='min-h-[100vh] mt-20 p-4'>
        <div className=''>
            <h1 className='text-4xl font-bold'>Add Service</h1>
            <div className='mt-4'>
                <ServiceForm/>
            </div>
        </div>
    </div>
  )
}

export default Page