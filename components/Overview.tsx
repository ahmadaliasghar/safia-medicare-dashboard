"use client";

import { useGetPatientsQuery } from "@/features/patientSlice";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import dayjs from "dayjs";

interface Patient {
  id: string;
  createdAt: string; // Assuming createdAt is the field containing the creation date
}

interface OverviewProps {
  data?: [];
}

const Overview: React.FC<OverviewProps> = () => {
  const { data: allPatients, isLoading, isSuccess, isError, error } = useGetPatientsQuery();

  // Function to format the data for Recharts
  const formatDataForChart = (patients: Patient[]) => {
    const currentDate = dayjs();
    const monthsData = Array.from({ length: 12 }, (_, i) => {
      const previousMonth = currentDate.subtract(i, "month");
      const monthYearString = previousMonth.format("YYYY-MM");
      return {
        name: monthYearString, // Format: YYYY-MM
        total: patients.filter(patient => {
          const patientDate = dayjs(patient.createdAt);
          return patientDate.isSame(previousMonth, "month");
        }).length
      };
    });
    return monthsData.reverse(); // Reverse the array to display the oldest month first
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formatDataForChart(allPatients?.patients || [])}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Bar dataKey="total" fill="#003049" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Overview;
