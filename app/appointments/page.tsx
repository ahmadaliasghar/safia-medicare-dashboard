'use client'
import Loader from '@/components/Loader';
import { useGetAppointmentsQuery, useDeleteAppointmentMutation } from '@/features/appointmentSlice';
import { Appointment, Person } from '@/types';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { HiSearch } from 'react-icons/hi';

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: <b>Appointment Title</b>,
    width: 220,
    sortable: false,
    filterable: false,
  },
  {
    field: 'patient',
    headerName: <b>Patient</b>,
    width: 220,
    sortable: false,
    filterable: false,
  },
  {
    field: 'date',
    headerName: <b>Date</b>,
    type: 'string',
    width: 120,
  },
  { field: 'start', headerName: <b>Start Time</b>, width: 180 },
  { field: 'end', headerName: <b>End Time</b>, width: 180 },
  {
    field: 'status',
    headerName: <b>Status</b>,
    type: 'string',
    width: 120,
  },
  {
    field: 'doctor',
    headerName: <b>Doctor</b>,
    sortable: false,
    width: 180,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: ({ id }) => {
      console.log("🚀 ~ id:", id)
      const handleEditClick = () => {
        console.log("Edit")
      }
      const handleDeleteClick = () => {
        console.log("Delete")
      }
      return [
        <GridActionsCellItem
          icon={<AiOutlineEdit />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<AiOutlineDelete />}
          label="Delete"
          onClick={() => handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
    // renderCell: (params) => (
    //   <div className="flex">
    //     <button className="mr-2 text-gray-600">
    //       <AiOutlineEdit />
    //     </button>
    //     <button className="text-red-600" >
    //       <AiOutlineDelete />
    //     </button>
    //   </div>
    // ),
  },
  
];

const Page = () => {
  const {
    data: allAppointments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAppointmentsQuery();
  const [filteredRows, setFilteredRows] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id).unwrap();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const handleEdit = (id: string) => {
    // Implement edit logic here
  };

  
  let rows:Appointment[] = [];

  allAppointments?.appointments?.forEach((appointment: Appointment) => {
    rows.push({
        id: appointment?._id as string,
        title: appointment?.title,
        patient: (appointment?.patient as Person)?.name,
        start: appointment?.startTime,
        end: appointment?.endTime,
        date: appointment?.date,
        status: appointment?.status,
        doctor: (appointment?.doctor as Person)?.name
      });
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredRows([]);
    } else {
      const filtered = rows?.filter(appointment =>
        appointment.title.toLowerCase().includes(term.toLowerCase()) ||
        (appointment.patient as Person)?.name?.toLowerCase().includes(term.toLowerCase()) ||
        appointment.date.toLowerCase().includes(term.toLowerCase()) ||
        (appointment.doctor as Person)?.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredRows(filtered || []);
    }
  };

  const dataRows: Appointment[] = searchTerm ? filteredRows : (rows || []);

  return (
    <div style={{ height: 600, width: '97%', marginLeft: '10px' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search appointments"
            className="pl-12 pr-4 py-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <HiSearch className="text-gray-400" size={24} />
          </div>
        </div>
        {isLoading && (<Loader style="items-center h-[70vh]" />)}
      </div>
      {!isLoading && (
        <DataGrid
          rows={dataRows}
          columns={columns}
          pageSizeOptions={[10, 20]}
          pagination
        />
      )}
    </div>
  );
};

export default Page;
