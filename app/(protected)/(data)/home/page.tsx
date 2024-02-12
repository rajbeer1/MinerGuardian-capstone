'use client';
import React, { useEffect, useState } from 'react';
import { fetchsensordata } from '@/helpers/fetchSensordata';
import MyBarChart from '@/components/graphs/recharts';
import DataBox from '@/components/ui/databox';
const Home = () => {
  const [isloading, setislodaing] = useState(false);
  const vibr = async () => {
    const response = await fetchsensordata('vibration', 15);
    setvibration(response.data);
  };
  const temp = async () => {
    const response = await fetchsensordata('temperature', 15);
    settemperature(response.data);
  };
  const alti = async () => {
    const response = await fetchsensordata('altitude', 15);
    setaltitude(response.data);
  };
  const gass = async () => {
    const response = await fetchsensordata('gas', 15);
    setgas(response.data);
  };
  const press = async () => {
    const response = await fetchsensordata('pressure', 15);
    setpressure(response.data);
  };
  const alldata = () => {
    setislodaing(true)
    temp();
    alti();
    gass();
    press();
    vibr();
    setislodaing(false)
  };
  useEffect(() => {
    alldata();
  }, []);

  const [vibration, setvibration] = useState({});
  const [temperature, settemperature] = useState({});
  const [altitude, setaltitude] = useState({});
  const [gas, setgas] = useState({});
  const [pressure, setpressure] = useState({});

  if(isloading) return<>loading</>
  return (
    <>
      
      <div className="flex items-center justify-center h-screen bg-slate-900 ">
        <div className="grid grid-cols-2 gap-3 p-2 w-8/9">
          <div className="bg-gray-300 p-1 rounded flex items-center justify-center">
            <MyBarChart data={pressure} name="pressure" />
          </div>
          <div className="bg-gray-300 p-1 rounded flex items-center justify-center">
            <MyBarChart data={gas} name="gas" />
          </div>
          <div className="bg-gray-300 p-1 rounded flex items-center justify-center">
            <MyBarChart data={altitude} name="altitude" />
          </div>
          <div className="bg-gray-300 p-1 rounded flex items-center justify-center">
            <MyBarChart data={temperature} name="temperature" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
