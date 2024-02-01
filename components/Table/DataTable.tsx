'use client'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Typography, Button } from '@mui/material';


const columns: GridColDef[] = [
  {
    field: 'avatar',
    headerName: 'Doctor',
    width: 220,
    renderCell: (params) => (
      <Box display="flex" alignItems="center">
        <Avatar src="" />
        <Typography variant="body1" ml={1}>
          {params.row.firstName}
        </Typography>
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
  { field: 'function', headerName: 'Specialist ', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
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
  {
    field: 'patient',
    headerName: 'Patient',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
  },
];

const rows = [
  { id: 1, function: 'Snow', firstName: 'Jon', status: 'active', patient: '200' },
  { id: 2, function: 'Lannister', firstName: 'Cersei', status: 'unactive', patient: '300' },
  { id: 3, function: 'Lannister', firstName: 'Jaime', status: 'unactive', patient: '100' },
  { id: 4, function: 'Stark', firstName: 'Arya', status: 'active', patient: '700' },
  { id: 5, function: 'Targaryen', firstName: 'Daenerys', status: 'active', patient: '900' },
  { id: 6, function: 'Melisandre', firstName: null, status: 'active', patient: '250' },
  { id: 7, function: 'Clifford', firstName: 'Ferrara', status: 'active', patient: '200' },
  { id: 8, function: 'Frances', firstName: 'Rossini', status: 'active', patient: '600' },
  { id: 9, function: 'Roxie', firstName: 'Harvey', status: 'active', patient: '800' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '97%',marginLeft:'10px'}}>
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