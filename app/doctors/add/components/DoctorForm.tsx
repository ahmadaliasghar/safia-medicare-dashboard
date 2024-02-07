'use client'
import { useAddPatientMutation, useGetPatientQuery, useGetPatientsQuery, useUpdatePatientMutation } from '@/features/patientSlice';
import { Patient } from '@/types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import moment from 'moment';
import dayjs from 'dayjs';
import ActionButton from '@/components/ActionButton';

const useForm = () => {
    const [formData, setFormData] = React.useState<Patient>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        contact: '',
        gender: ''
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


const DoctorForm = () => {
    const params = useParams();
    const { id } = params;

    const [addPatient] = useAddPatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const { formData, setFormData, handleChange } = useForm();
    const [errors, setErrors] = React.useState<Patient>();
    const {
        data: patient,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPatientQuery(id);
    console.log("🚀 ~ DoctorForm ~ patient:", patient?.patient)
    React.useEffect(() => {
        if (patient && patient.patient) {
            setFormData(patient.patient);
        }
    }, [patient]);

    const router = useRouter();

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        // if (!validateForm()) {
        //     return;
        // }
        let dataToSend = { ...formData }; // Create a copy of formData

        // Exclude _id property
        if (dataToSend._id) {
            delete dataToSend._id;
        }

        if (id) {
            updatePatient({ patientId: id, body: dataToSend }).unwrap().then(() => {
                toast.success('Doctor updated successfully')
                setFormData({ name: '', contact: '', speciality: '', degree: '', email: '', username: '' });
                router.push("/doctors")
            }).catch(() => { })
        } else {
            addPatient(formData).unwrap().then(() => {
                toast.success('Patient added successfully')
                setFormData({ firstName: '', lastName: '', email: '', dateOfBirth: '', contact: '', gender: '' });
                router.push("/doctors")
            }).catch(() => { })
        }
    };

    return (
        <div>
            <div className="w-full h-full">
                <div className="w-full h-full">
                    <div className="rounded-sm  border border-stroke min-h-[100vh] bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full h-full justify-center">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark justify-between flex items-center">
                            <h3 className="font-medium text-black dark:text-white w-full xl:w-1/2 ml-3">
                                {id ? "Edit" : "Add"} Doctor
                            </h3>
                            <div className="flex mb-6 mr-9 mt-2">
                                <ActionButton type='success'
                                    onClick={handleSave}
                                >
                                    Save
                                </ActionButton>
                                <ActionButton type="default">
                                    Cancel
                                </ActionButton>
                            </div>
                        </div>

                        <form onSubmit={handleSave}>
                            <div className="p-6.5 flex flex-wrap gap-6 justify-center">
                                <div className="w-full md:w-1/2 ml-3">
                                    <label className="mb-2.5 block text-black dark:text-white mt-3">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={formData.name}
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
                                                value={dayjs(formData?.dateOfBirth) || null} // Convert to JavaScript Date object
                                                onChange={(date) => handleChange('dateOfBirth', date)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>


                                </div>
                                <div className="w-full md:w-1/2 ml-3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Gender
                                    </label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={(e) => handleChange('gender', e.target.value)}
                                                className="mr-2"
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={(e) => handleChange('gender', e.target.value)}
                                                className="mr-2"
                                            />
                                            Female
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={formData.gender === 'other'}
                                                onChange={(e) => handleChange('gender', e.target.value)}
                                                className="mr-2"
                                            />
                                            Other
                                        </label>
                                    </div>
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

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorForm