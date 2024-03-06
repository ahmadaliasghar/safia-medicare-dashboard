'use client'
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  IconButton,
} from '@mui/material';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import ActionButton from '@/components/ActionButton';
import Link from 'next/link';

const Page = () => {
  const [openRow, setOpenRow] = useState(null);

  const handleToggleRow = (index: any) => {
    setOpenRow(openRow === index ? null : index);
  };

  const rows = [
    {
      name: 'Value 1',
      price: 'Value 1',
      duration: 'Value 1',
      subRows: [
        { subName: 'SubItem 1-1', subPrice: 'SubValue 1-1', subDuration: 'SubValue 1-1' },
        { subName: 'SubItem 1-2', subPrice: 'SubValue 1-2', subDuration: 'SubValue 1-2' },
      ],
    },
    {
      name: 'Value 2',
      price: 'Value 2',
      duration: 'Value 2',
      subRows: [
        { subName: 'SubItem 2-1', subPrice: 'SubValue 2-1', subDuration: 'SubValue 2-1' },
        { subName: 'SubItem 2-2', subPrice: 'SubValue 2-2', subDuration: 'SubValue 2-2' },
      ],
    },
  ];

  return (
    <div className='min-h-[100vh] mt-20 p-4'>
      <div className='flex justify-between items-center mb-3'>
        <h1 className='text-3xl font-bold'>Services</h1>
        <Link href={"services/add"}>
          <ActionButton type="success">Add Service</ActionButton>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='font-bold w-[33%]'><b>Name</b></TableCell>
              <TableCell className='font-bold w-[33%]'><b>Price</b></TableCell>
              <TableCell className='font-bold w-[33%]'><b>Duration of Service</b></TableCell>
              <TableCell className='font-bold w-[33%]'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow className='w-full  bg-white shadow-lg rounded-md'>
                  <TableCell className='font-bold'>{row.name}</TableCell>
                  <TableCell className='font-bold'>{row.price}</TableCell>
                  <TableCell className='font-bold '>
                    {row.duration}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleToggleRow(index)}
                      style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        transform: openRow === index ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    >
                      <span onClick={() => handleToggleRow(index)} style={{ cursor: 'pointer' }}>
                        {openRow === index ? <FaCaretUp color="black" size={14} /> : <FaCaretDown color="black" size={14} />}
                      </span>
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className='p-0 m-0'>
                    {openRow === index && (
                      <Table>
                        <TableBody>
                          {row.subRows.map((subRow, subIndex) => (
                            <TableRow key={subIndex}>
                              <TableCell >{subRow.subName}</TableCell>
                              <TableCell >{subRow.subPrice}</TableCell>
                              <TableCell >{subRow.subDuration}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                    <Collapse in={openRow === index} timeout='auto' unmountOnExit>
                      <Table>
                        <TableBody>
                          {row.subRows.map((subRow, subIndex) => (
                            <TableRow key={subIndex} className="w-full" colSpan={3}>
                              <TableCell>{subRow.subName}</TableCell>
                              <TableCell>{subRow.subPrice}</TableCell>
                              <TableCell>{subRow.subDuration}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                </TableRow> */}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page;
