'use client'
import { useAddDoctorMutation, useGetDoctorsQuery } from '@/features/doctorSlice';
import { Doctor } from '@/types';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import ActionButton from '@/components/ActionButton';

const useForm = () => {
    const [formData, setFormData] = React.useState<Doctor>({
        name: '',
        contact: '',
        speciality: '',
        degree: '',
        email: '',
        username: '',
        status: 'active'
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

    const [addDoctor] = useAddDoctorMutation();
    const { formData, setFormData, handleChange } = useForm();
    const [errors, setErrors] = React.useState<Doctor>();
    const {
        data: doctor,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetDoctorsQuery(id);
    console.log("🚀 ~ DoctorForm ~ doctor:", doctor?.doctor)
    React.useEffect(() => {
        if (doctor && doctor.doctor) {
            setFormData(doctor.doctor);
        }
    }, [doctor]);

    const router = useRouter();

    const handleSave = async () => {
        addDoctor(formData)
            .unwrap()
            .then(() => {
                toast.success('Doctor added successfully');
                setFormData({
                    name: '',
                    contact: '',
                    speciality: '',
                    degree: '',
                    email: '',
                    username: '',
                    status: '',
                });
                router.push("/doctors")
            })
            .catch(() => { });
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
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 ml-3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your user name"
                                        value={formData.username}
                                        onChange={(e) => handleChange('username', e.target.value)}
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
                                <div className="w-full md:w-1/2 ml-3">
                                    <label className="mb-2.5 block text-black dark:text-white ">
                                        Degree
                                    </label>
                                    <input
                                        type="degree"
                                        placeholder="Enter your degree"
                                        value={formData.degree}
                                        onChange={(e) => handleChange('degree', e.target.value)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 ml-3">
                                    <label className="mb-2.5 block text-black dark:text-white ">
                                        Speciality
                                    </label>
                                    <input
                                        type="speciality"
                                        placeholder="Enter your speciality"
                                        value={formData.speciality}
                                        onChange={(e) => handleChange('speciality', e.target.value)}
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