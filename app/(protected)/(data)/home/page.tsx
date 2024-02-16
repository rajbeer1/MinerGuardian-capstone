'use client';
import React, { useEffect, useState } from 'react';
import { fetchsensordata } from '@/helpers/fetchSensordata';
import MyBarChart from '@/components/graphs/recharts';
import { DataBox } from '@/components/ui/databox'
import Cookies from 'js-cookie';
import axiosClient from '@/helpers/axios';
const Home = () => {
  const [dataBox,setdataBox]= useState({})
  const [isloading, setislodaing] = useState(false);
  
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
  const databox = async () => {
    const response = await axiosClient.get('/data/box', {
      headers: {
        Authorization: `Bearer ${Cookies.get('user')}`
      }
    })
    setdataBox(response.data)
  }
  const alldata = () => {
    setislodaing(true)
    
    databox();
    temp();
    alti();
    gass();
    press();

    setislodaing(false)
  };
  useEffect(() => {
    alldata();
    console.log(dataBox)
  }, []);


  const [temperature, settemperature] = useState({});
  const [altitude, setaltitude] = useState({});
  const [gas, setgas] = useState({});
  const [pressure, setpressure] = useState({});

  if(isloading) return<>loading</>
  return (
    <>
      <div
        className="flex items-start justify-center bg-slate-900"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        {/* DataBox on the left */}
        <div className="w-1/5 p-4 flex flex-col">
          <DataBox
            data ={dataBox}
          />
        </div>

        {/* Charts on the right */}
        <div className="w-4/5 p-4">
          <div className="grid grid-cols-2 gap-3">
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
      </div>
    </>
  );
};

export default Home;
