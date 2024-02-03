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

const useForm = () => {
  const [formData, setFormData] = React.useState<Patient>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    contact: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return {
    formData,
    handleChange,
    setFormData
  };
};

const Page = () => {
  const [addPatient] = useAddPatientMutation();
  const { formData, setFormData, handleChange } = useForm();
  const [errors, setErrors] = React.useState<Patient>();

  const router = useRouter();

  const validateForm = () => {
    const newErrors: Partial<Patient> = {};

    // Check if each required field has a value
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Phone Number is required';
    }

    setErrors(newErrors as Patient);

    // Show toast notifications for errors using react-hot-toast
    Object.values(newErrors).forEach((error) => {
      toast.error(error, {
        duration: 3000, // Close the toast after 3 seconds
      });
    });

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      // Form is not valid, do not proceed with submission
      return;
    }

    try {
      const response = await addPatient(formData);
      console.log('Patient added successfully:', response);
      toast.success('Patient added successfully');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: null,
        contact: '',
      });
      router.push('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
      toast.error('Error adding patient');
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
                    <label className="mb-2.5 block text-black dark:text-white">
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
                    <label className="mb-2.5 block text-black dark:text-white ">
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
                    <label className="mb-2.5 block text-black dark:text-white ">
                      Date of Birth
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Date of Birth"
                          className='w-full'
                          value={formData.dateOfBirth}
                          onChange={(date) => handleChange('dateOfBirth', date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full md:w-1/2 ml-3">
                    <label className="mb-2.5 block text-black dark:text-white">
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
