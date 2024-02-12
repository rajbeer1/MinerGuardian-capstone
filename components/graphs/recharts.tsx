"use client"
import { useState } from 'react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,Text,Label} from 'recharts';
const MyBarChart = ({ data, name }: any) => { 
  console.log(data)
  function calculateAveragePressure(data: any, name: any) {
  let totalPressure = 0;
  for (let i = 0; i < data.length; i++) {
    totalPressure += data[i][name];
  }
  return totalPressure / data.length;
  }
  const average = calculateAveragePressure(data,name)
for (let i = 0; i < data.length; i++) {
  data[i][name] = parseFloat(data[i][name].toFixed(3));
}

  return (
    <BarChart
      width={600}
      height={360}
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 20,
      }}
    > 
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={false} >
        
      </XAxis>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={name} fill="#8884d8" />
      <ReferenceLine y={average} stroke="red" strokeDasharray="5 5" strokeWidth={3} >
        <Label position={'top'} style={{
    fontSize: '1.05em',
          fill: 'black', 
          marginTop: '26px'
           
        }}
          
        >{`AVG:${average.toFixed(2)}`}</Label>
      </ReferenceLine>
 
    </BarChart>)
};

export default MyBarChart;