'use client'
import { useState } from "react";
import { Patient } from "@/types";
import Image from "next/image";
import Icon from "@/assets/images/Profile.jpg"
import ActionButton from "../ActionButton";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDeletePatientMutation } from "@/features/patientSlice";
import toast from "react-hot-toast";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

  return `${ageString}`.trim();
};


interface PatientTableProps {
  data: Patient[];
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: <b>Patient</b>,
    width: 220,
    renderCell: (params) => (
      <Box display="flex" alignItems="center">
        <Avatar src="" />
        <Typography variant="body1" ml={1}>
          {params.row.name}
        </Typography>
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
  { field: 'age', headerName: <b>Age</b>, width: 110 },
  { field: 'gender', headerName: <b>Gender</b>, width: 110 },
  { field: 'contact', headerName: <b>Contact</b>, width: 160 },
  { field: 'email', headerName: <b>Email</b>, width: 220 },
];

const PatientTable: React.FC<PatientTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<string | null>('name'); // Set default criteria to 'name'


  let rows: Patient[] = [];

  data?.forEach((patient: Patient) => {
    rows.push({
      id: patient?._id as string,
      name: patient?.firstName + " " + patient?.lastName,
      contact: patient?.contact,
      email: patient?.email,
      gender: patient?.gender,
      age: calculateAge(patient?.dateOfBirth)
    });
  });

  const filteredData = rows?.filter((patient) => {
    const fullName = `${patient.name}`.toLowerCase();

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

  const [deletePatient] = useDeletePatientMutation();

  const handleDeletePatient = (id:string) => {
    deletePatient(id).unwrap().then(()=> { toast.success("Patient Deleted")}
    ).catch(()=> { toast.error("Error, Deleting Patient")})
  }


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default px-4">
      <div className="py-6 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black">
          Patients
        </h4>
        <Link href={'/patients/add-patient'}>
          <ActionButton type="success">
            Add Patient
          </ActionButton>
        </Link>

      </div>
      <div className="py-2 flex items-center">
        <input
          type="text"
          placeholder="Search by name, email, or contact"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-stroke p-2 w-full rounded-md focus:outline-none"
        />
      </div>
      <div style={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
      />
    </div>
    </div>
  );
};

export default PatientTable;
