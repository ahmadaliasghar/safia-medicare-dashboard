'use client'
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const data = [
  { name: 'Male', daily: 10, monthly: 150, yearly: 500 },
  { name: 'Female', daily: 8, monthly: 100, yearly: 400 },
];

const COLORS = ['#FFC312', '#FF5733'];

const Piechart = () => {
  const [selectedOption, setSelectedOption] = useState('monthly');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderData = data.map(entry => ({
    name: entry.name,
    value: entry[selectedOption],
  }));

  return (
    <div>
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="select-label">Interval</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedOption}
          onChange={handleSelectChange}
          label="Interval"
          style={{
            borderRadius: 4,
            backgroundColor: '#f0f0f0',
            padding: '4px',
            height: "35px"
          }}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={renderData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
            label={(entry) => `${entry.name} ${entry.value}`}
          >
            {renderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} ${name}`, ""]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Piechart;
