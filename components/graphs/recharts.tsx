"use client"
import { useState,useEffect } from 'react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Text, Label, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ data, name }: any) => { 
  const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 360 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth > 600 ? 600 : window.innerWidth - 40;
      const height = width * 0.6; // Maintain aspect ratio
      setChartDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  function calculateAveragePressure(data: any, name: any) {
    let totalPressure = 0;
    for (let i = 0; i < data.length; i++) {
      totalPressure += data[i][name];
    }
    return totalPressure / data.length;
  }
  const average = calculateAveragePressure(data, name);

  for (let i = 0; i < data.length; i++) {
    data[i][name] = parseFloat(data[i][name].toFixed(3));
  }

  return (
    <ResponsiveContainer width="100%" height={chartDimensions.height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={<Text fontSize="12" fill="black" />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={name} fill="#475569" />
        <ReferenceLine
          y={average}
          stroke="red"
          strokeDasharray="5 5"
          strokeWidth={3}
        >
          <Label
            position={'top'}
            style={{ fontSize: '1.05em', fill: '#475569', marginTop: '26px' }}
          >{`AVG:${average.toFixed(2)}`}</Label>
        </ReferenceLine>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;