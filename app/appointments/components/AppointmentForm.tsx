'use client'
import { useAddAppointmentMutation } from '@/features/appointmentSlice';
import { useGetPatientsQuery } from '@/features/patientSlice';
import { Appointment, Response } from '@/types';
import { Schema, Types } from 'mongoose';
import React, { useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';

interface PatientOption {
  _id: string
  label: string;
  value: string;
  firstName: string;
}

const AppointmentForm: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Appointment>({
    title: '',
    date: '',
    time: '',
    doctor: '',
    patient: '',
    status: 'pending',
  });

  const {
    data: allPatients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery();

  const [addAppointment] = useAddAppointmentMutation();

  const handleChangePatient = (selectedOption: PatientOption | null) => {
    if (selectedOption) {
      const { _id } = selectedOption;
      setFormData({ ...formData, patient: _id });
    } else {
      setFormData({ ...formData, patient: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({ ...formData, doctor: '65bb623f10daa72d6678ce30', patient: formData.patient }).unwrap()
      .then((res) => {
        if (res.status === 200) {
          setFormData((prevFormData) => ({
            title: '',
            date: '',
            time: '',
            doctor: '',
            patient: '',
            status: 'pending',
          }));
          handleChangePatient(null);
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleSubmit ~ err:", err)
      })
  };
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d9d4f1' : 'white',
      color: 'black',
    }),
  };

  return (
    <div className="w-[65vw] mx-auto mt-10 p-8 bg-white rounded-md shadow-md relative">
    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Schedule an Appointment</h2>

    {isFormVisible ? (
      <div className='flex gap-6'>
       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="patient" className="block text-gray-800 mb-2">
              Select Patient
            </label>
            <Select
              id="patient"
              name="patient"
              options={allPatients?.patients}
              getOptionLabel={(option) => option?.firstName}
              getOptionValue={(option) => option?._id}
              className="w-full"
              placeholder="Select a patient"
              styles={customStyles}
              onChange={handleChangePatient}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 mb-2">
              Title
            </label>
            <input
              type="text"
              id="name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:border-blue-500"
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
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:border-blue-500"
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
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#8b5cf6] text-white w-full px-6 py-2 rounded-md hover:bg-[#7d53df] focus:outline-nonemt-4 mr-4"
            >
              Schedule
            </button>
          </div>
        </form>
        <img
          src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
          alt="Illustration"
          className="w-[40%] ml-8 lg:block h-64 flex items-center justify-center"
        />
      </div>
    ) : (
      <Button
        onClick={toggleFormVisibility}
        variant="contained"
        style={{ backgroundColor: '#8b5cf6', color: 'white' }}
      >
        Open Appointment Form
      </Button>
    )}
  </div>
);
};

 

export default AppointmentForm;
