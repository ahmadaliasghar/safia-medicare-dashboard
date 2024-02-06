'use client'
import React, { useState } from 'react';
import { useGetPatientDiagnosisQuery, useGetPatientQuery } from '@/features/patientSlice';
import { Patient } from '@/types';
import { useParams } from 'next/navigation';
import { Grid, Typography, TextField, Button, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, InputAdornment, IconButton, Collapse, Box } from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { MdOutlineKeyboardArrowDown,MdOutlineKeyboardArrowUp } from "react-icons/md";

const Page = () => {
    const param = useParams();

    const { id } = param;

    const [formData, setFormData] = React.useState<Patient>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        contact: '',
        gender: ''
    });

    const [status, setStatus] = React.useState('');
    const [diagnosis, setDiagnosis] = React.useState('');
    const [disease, setDisease] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openRows, setOpenRows] = useState<number[]>([]);
    const [previousHistory, setPreviousHistory] = React.useState<{ status: string; diagnosis: string; disease: string; time: string; }[]>([]);
    
    const {
        data: patient,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPatientQuery(id);

    const {
        data: diagnose,
        isLoading: isLoadingDiagnosis,
        isSuccess: isSuccessDiagnosis,
        isError: isErrorDiagnosis,
        error: errorDiagnosis,
    } = useGetPatientDiagnosisQuery(id);

    React.useEffect(() => {
        if (patient && patient.patient) {
            setFormData(patient.patient);
            setPreviousHistory(patient.patient.previousHistory || []);
        }
    }, [patient]);

    const handleRowToggle = (index: number) => {
        toggleRow(index);
    };

    const toggleRow = (index: number) => {
        setOpenRows(prevOpenRows => (
            prevOpenRows.includes(index) ? prevOpenRows.filter(i => i !== index) : [...prevOpenRows, index]
        ));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    }

    const handleDiagnosisChange = (value: string) => { 
        setDiagnosis(value);
    }

    const handleDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisease(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <Grid container spacing={4} justifyContent="center" className="m-4">
            <Grid item xs={12} md={6} className='h-auto'>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Add Diagnosis
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
                <div>
                    <Typography variant="h6" gutterBottom>
                        Patient Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        First Name: {formData.firstName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Last Name: {formData.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Age: {formData.dateOfBirth}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div>
                    <Typography variant="body1" gutterBottom>
                        Gender: {formData.gender}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: {formData.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Contact: {formData.contact}
                    </Typography>
                </div>
            </Grid>
        </Grid>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Status"
                            value={status}
                            onChange={handleStatusChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <ReactQuill 
                            theme="snow"
                            value={diagnosis}
                            onChange={handleDiagnosisChange}
                            className="mb-4"
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                    ['link', 'image'],
                                    ['clean']
                                ]
                            }}
                            formats={[
                                'header',
                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                'list', 'bullet', 'indent',
                                'link', 'image'
                            ]}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Disease"
                            value={disease}
                            onChange={handleDiseaseChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit Diagnosis
                        </Button>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Patient History
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <IoIosSearch />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                    <TableContainer>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Disease</TableCell>
                <TableCell>Time</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {previousHistory.map((history, index) => (
                <React.Fragment key={index}>
                    <TableRow>
                        <TableCell>{history.status}</TableCell>
                        <TableCell>
                            <div dangerouslySetInnerHTML={{ __html: history.diagnosis }} />
                        </TableCell>
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleRowToggle(index)}
                            >
                                {openRows.includes(index) ? <MdOutlineKeyboardArrowUp size={22} /> : <MdOutlineKeyboardArrowDown size={22} />}
                            </IconButton> See
                        </TableCell>
                        <TableCell>{history.time}</TableCell>
                    </TableRow>
                    {openRows.includes(index) && (
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                <Collapse in={openRows.includes(index)} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Diagnosis
                                        </Typography>
                                        <div dangerouslySetInnerHTML={{ __html: history.diagnosis }} />
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            ))}
        </TableBody>
    </Table>
</TableContainer>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Page;
