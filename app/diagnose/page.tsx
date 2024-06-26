'use client'
import { useState } from "react";
import { Patient } from "@/types";
import Image from "next/image";
import Icon from "@/assets/images/Profile.jpg"
import ActionButton from "@/components/ActionButton";   
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDeletePatientMutation, useGetPatientsQuery } from "@/features/patientSlice";
import toast from "react-hot-toast";


export const calculateAge = (dob: string | undefined): string => {
  if (!dob) return 'N/A';

  const birthDate = new Date(dob);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }


  const ageString = years > 0 ? `${years} years` : '';
  const monthsString = months > 0 ? `${months} months` : '';

  return `${ageString} ${monthsString}`.trim();
};


const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<string | null>('name'); // Set default criteria to 'name'

    
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery();

  const filteredData = data?.patients?.filter((patient) => {
    const fullName = `${patient?.firstName} ${patient?.lastName}`.toLowerCase();

    if (
      !searchTerm ||
      fullName.includes(searchTerm.toLowerCase()) ||
      patient?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.contact.includes(searchTerm)
    ) {
      return true;
    }
    return false;
  });

  if (filterCriteria) {
    filteredData?.sort((a, b) => {
      const criteriaA =
        filterCriteria === 'name'
          ? `${a.firstName} ${a.lastName}`
          : a[filterCriteria as keyof Patient];

      const criteriaB =
        filterCriteria === 'name'
          ? `${b.firstName} ${b.lastName}`
          : b[filterCriteria as keyof Patient];

      return criteriaA.localeCompare(criteriaB);
    });
  }



  const [deletePatient] = useDeletePatientMutation();

  const handleDeletePatient = (id:string) => {
    deletePatient(id).unwrap().then(()=> { toast.success("Patient Deleted")}
    ).catch(()=> { toast.error("Error, Deleting Patient")})
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default ">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black">
          Patients
        </h4>
        <Link href={'/patients/add-patient'}>
          <ActionButton type="success">
            Add Patient
          </ActionButton>
        </Link>

      </div>
      <div className="py-2 px-4 md:px-6 xl:px-7.5 flex items-center">
        <input
          type="text"
          placeholder="Search by name, email, or contact"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-stroke p-2 w-full rounded-md focus:outline-none"
        />
      </div>

      {/* Filter dropdown */}
      <div className="py-2 px-4 md:px-6 xl:px-7.5 flex items-center">
        <label className="text-black font-medium mr-2">Filter by:</label>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black p-3">Patient Name</p>
        </div>
        <div className="col-span-1  items-center sm:flex">
          <p className="font-medium text-black p-3">Age</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Gender</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black p-3">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Contact</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Actions</p>
        </div>
      </div>

      {filteredData?.map((patient, index) => (
        <div
          className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md p-2">
                <Image
                  src={Icon}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <Link href={`/diagnose/${patient?._id}`} className="text-sm text-black p-2">
                {patient.firstName + " " + patient?.lastName}
              </Link>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black p-2">
              {calculateAge(patient?.dateOfBirth)}
              
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black p-2">
              {patient?.gender}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black p-2">
              {patient?.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black p-2">{patient?.contact}</p>
          </div>
          <div className="items-center flex space-x-2">
            <Link href={`/patients/edit-patient/${patient?._id}`}><FaEdit className="text-meta-3 cursor-pointer" /></Link>
            <MdDelete className="text-red-500 cursor-pointer" onClick={() => handleDeletePatient(patient?._id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;