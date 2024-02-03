'use client'
import { Patient } from "@/types";
import Image from "next/image";
import Icon from "@/assets/images/Profile.jpg"
import ActionButton from "../ActionButton";
import Link from "next/link";
import { useState } from "react";
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import '@/styles/Select.module.css'

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


interface PatientTableProps {
  data: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<string | null>('name'); // Set default criteria to 'name'

  const filteredData = data.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();

    if (
      !searchTerm ||
      fullName.includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.includes(searchTerm)
    ) {
      return true;
    }
    return false;
  });

  if (filterCriteria) {
    filteredData.sort((a, b) => {
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
        <Select.Root>
    <Select.Trigger className="SelectTrigger" aria-label="Food">
      <Select.Value placeholder="Select a fruit…" />
      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel">Fruits</Select.Label>
            <Select.SelectItem value="apple">Apple</Select.SelectItem>
            <Select.SelectItem value="banana">Banana</Select.SelectItem>
            <Select.SelectItem value="blueberry">Blueberry</Select.SelectItem>
            <Select.SelectItem value="grapes">Grapes</Select.SelectItem>
            <Select.SelectItem value="pineapple">Pineapple</Select.SelectItem>
          </Select.Group>

          <Select.Separator className="SelectSeparator" />

          <Select.Group>
            <Select.Label className="SelectLabel">Vegetables</Select.Label>
            <Select.SelectItem value="aubergine">Aubergine</Select.SelectItem>
            <Select.SelectItem value="broccoli">Broccoli</Select.SelectItem>
            <Select.SelectItem value="carrot" disabled>
              Carrot
            </Select.SelectItem>
            <Select.SelectItem value="courgette">Courgette</Select.SelectItem>
            <Select.SelectItem value="leek">Leek</Select.SelectItem>
          </Select.Group>

          <Select.Separator className="SelectSeparator" />

          <Select.Group>
            <Select.Label className="SelectLabel">Meat</Select.Label>
            <Select.SelectItem value="beef">Beef</Select.SelectItem>
            <Select.SelectItem value="chicken">Chicken</Select.SelectItem>
            <Select.SelectItem value="lamb">Lamb</Select.SelectItem>
            <Select.SelectItem value="pork">Pork</Select.SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black p-3">Patient Name</p>
        </div>
        <div className="col-span-2  items-center sm:flex">
          <p className="font-medium text-black p-3">Age</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black p-3">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Contact</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Profit</p>
        </div>
      </div>

      {filteredData?.map((patient, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
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
              <p className="text-sm text-black p-2">
                {patient.firstName + " " + patient?.lastName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black p-2">
              {calculateAge(patient?.dateOfBirth)}
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
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3 p-2 text-black">$ {index}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientTable;
