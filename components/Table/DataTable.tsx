'use client'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { useAddDoctorMutation, useGetDoctorsQuery } from '@/features/doctorSlice';
import { Doctor } from '@/types';

interface DoctorTableProp {
  data: Doctor[]
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: <b>Doctor</b>,
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
  { field: 'speciality', headerName: <b>Specialist</b>, width: 110 },
  { field: 'degree', headerName: <b>Degree</b>, width: 110 },
  { field: 'username', headerName: <b>User Name</b>, width: 110 },
  { field: 'email', headerName: <b>Email</b>, width: 150 },
  { field: 'contact', headerName: <b>Phone Number</b>, width: 110 },
  {
    field: 'status',
    headerName: <b>Status</b>,
    type: 'string',
    width: 120,
    renderCell: (params) => (
      <Button
        variant="contained"
        style={{
          height: '25px',
          padding: '6px 6px',
          backgroundColor: params.row.status === 'active' ? 'green' : 'gray',
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontFamily: 'Helvetica',
            fontSize: '12px',
            fontWeight: 700,
            lineHeight: '20px',
            letterSpacing: '0em',
            textAlign: 'center',
          }}
        >
          {params.row.status}
        </Typography>
      </Button>
    ),
  },

];


const DataTable: React.FC<DoctorTableProp> = ({ data }) => {
  const {
    data: allDoctors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDoctorsQuery();
  console.log("🚀 ~ DataTable ~ allDoctors:", allDoctors)

  let rows: Doctor[] = [];

  allDoctors?.doctors?.forEach((doctors: Doctor) => {
    rows.push({
      id: doctors?._id as string,
      name: doctors?.name,
      contact: doctors?.contact,
      degree: doctors?.degree,
      speciality: doctors?.speciality,
      username: doctors?.username,
      email: doctors?.email,
      status: doctors?.status,
    });
  });

  return (
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
  );
}
export default DataTable