'use client'
import Loader from '@/components/Loader';
import { useGetAppointmentsQuery } from '@/features/appointmentSlice';
import { Appointment, Person } from '@/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Appointment Title',
    width: 220,
    sortable: false,
    filterable: false,
  },
  {
    field: 'patient',
    headerName: 'Patient',
    width: 220,
    sortable: false,
    filterable: false,
  },
  { field: 'time', headerName: 'AppointmentTime ', width: 180 },
  {
    field: 'date',
    headerName: 'Date',
    type: 'string',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    width: 120,
  },
  {
    field: 'doctor',
    headerName: 'Doctor',
    sortable: false,
    width: 180,
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

  let rows:Appointment[] = [];

  allAppointments?.appointments?.forEach((appointment: Appointment) => {
    rows.push({
        id: appointment?._id as string,
        title: appointment?.title,
        patient: (appointment?.patient as Person)?.name,
        time: appointment?.time,
        date: appointment?.date,
        status: appointment?.status,
        doctor: (appointment?.doctor as Person)?.name
      });
  });

  return (
    <div style={{ height: 600, width: '97%',marginLeft:'10px'}}>
      {isLoading && (<Loader style="items-center h-[70vh]" />)}
      {!isLoading && (
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />)}
    </div>
  )
}

export default Page