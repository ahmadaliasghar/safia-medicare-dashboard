'use client'
import { useGetPatientsQuery } from '@/features/patientSlice';
import React, { useState } from 'react';
import Select from 'react-select';

interface FormData {
  _id?: string;
  patient: string;
  name: string;
  email: string;
  date: string;
  time: string;
}

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    patient: '',
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const {
    data:allPatients,
    isLoading,
    isSuccess,
    isError,
    error
  }=useGetPatientsQuery();
  
    console.log("🚀 ~ error:", error)
    console.log("🚀 ~ isError:", isError)
    console.log("🚀 ~ isSuccess:", isSuccess)
    console.log("🚀 ~ isLoading:", isLoading)
    console.log("🚀 ~ data:", allPatients?.patients)

  const patients: { label: string; value: string }[] = [
    { label: 'Patient 1', value: 'patient1' },
    { label: 'Patient 2', value: 'patient2' },
    { label: 'Patient 3', value: 'patient3' },
    // Add more patients as needed
  ];

  const handleChange = (selectedOption: { label: string; value: string }) => {
    setFormData({ ...formData, patient: selectedOption.value });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d9d4f1' : 'white', // Light purple when selected
      color: 'black',
    }),
  };


  return (
    <div className="w-[65vw] mx-auto mt-10 p-8 bg-white rounded-md shadow-md relative">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Schedule an Appointment</h2>
      <div className='flex gap-6'>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="patient" className="block text-gray-800 mb-2">
            Select Patient
          </label>
          <Select
              id="patient"
              name="patient"
              value={allPatients?.patients.find((p:any) => p?._id === formData?._id)}
              options={allPatients?.patients}
              getOptionLabel={option => option?.firstName || "Hello"}
              getOptionValue={option => option?._id}
              className="w-full"
              placeholder="Select a patient"
              styles={customStyles}
            />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            // onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            // onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-800 mb-2">
            Appointment Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            // onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-800 mb-2">
            Appointment Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            // onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1 relative">
          <button
            type="submit"
            className="bg-[#8b5cf6] text-white px-6 py-2 rounded-md hover:bg-[#7d53df] focus:outline-none absolute right-0 top-0 mt-4 mr-4"
          >
            Schedule
          </button>
        </div>
      </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" // Replace with the path to your SVG file
            alt="Illustration"
            className="w-[40%]  lg:block h-64 flex items-center justify-center"
          />
          </div>
    </div>
  );
};

export default AppointmentForm;
