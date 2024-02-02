'use client'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import { useAddPatientMutation } from '@/features/patientSlice';


const useForm = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    contact: '',
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return {
    formData,
    handleChange,
  };
};

const Page = () => {
  const [addPatient] = useAddPatientMutation();
  const { formData, handleChange } = useForm();




  const handleSave = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
  
    try {
      const response = await addPatient(formData);
      console.log('Patient added successfully:', response);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };
  

  return (
    <>
      <div className="flex items-center w-full h-full m-4">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="rounded-sm  border border-stroke min-h-[100vh] bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full h-full justify-center">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white w-full xl:w-1/2 ml-3">
                  Add Patient
                </h3>
              </div>
              <form onSubmit={handleSave}>
                <div className="p-6.5 flex flex-wrap gap-6 justify-center">
                  <div className="w-full md:w-1/2 ml-3">
                    <label className="mb-2.5 block text-black dark:text-white mt-3">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full md:w-1/2 ml-3">
                    <label className="mb-2.5 block text-black dark:text-white mt-3">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full md:w-1/2 ml-3">
                    <label className="mb-2.5 block text-black dark:text-white mt-3">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full md:w-1/2 ml-3">
                    <label className="mb-2.5 block text-black dark:text-white mt-3">
                      Date of Birth
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Date of Birth"
                          value={formData.dateOfBirth}
                          onChange={(date) => handleChange('dateOfBirth', date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full md:w-1/2 ml-3">
                    <label className="mb-2.5 block text-black dark:text-white mt-3">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Phone number"
                      value={formData.contact}
                      onChange={(e) => handleChange('contact', e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex  mt-6 mb-6 justify-center">
                  <button
                    type="submit"
                    // onClick={handleSave}
                    className="flex-shrink-0 px-4 py-2 font-medium text-gray border rounded bg-primary mb-4 ml-4"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="flex-shrink-0 px-4 py-2 font-medium text-gray border rounded bg-gray-light dark:bg-gray-dark mb-4 ml-4"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
