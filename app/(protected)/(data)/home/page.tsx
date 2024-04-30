'use client';
import React, { useEffect, useState } from 'react';
import { fetchsensordata } from '@/helpers/fetchSensordata';
import MyBarChart from '@/components/graphs/recharts';
import { DataBox } from '@/components/ui/databox'
import Cookies from 'js-cookie';
import axiosClient from '@/helpers/axios';
import Loader from '@/components/loader';

const Home = () => {
  const [dataBox, setdataBox] = useState({});
  const [isloading, setislodaing] = useState(false);
  const [temperature, settemperature] = useState([]);
  const [altitude, setaltitude] = useState([]);
  const [gas, setgas] = useState([]);
  const [pressure, setpressure] = useState([]);

  const fetchData = async () => {
    setislodaing(true);

    try {
      const [tempResponse, altiResponse, gasResponse, pressResponse, dataBoxResponse] = await Promise.all([
        fetchsensordata('temperature', 15),
        fetchsensordata('altitude', 15),
        fetchsensordata('gas', 15),
        fetchsensordata('pressure', 15),
        axiosClient.get('/data/box', {
          headers: {
            Authorization: `Bearer ${Cookies.get('user')}`
          }
        })
      ]);

      settemperature(tempResponse.data);
      setaltitude(altiResponse.data);
      setgas(gasResponse.data);
      setpressure(pressResponse.data);
      setdataBox(dataBoxResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setislodaing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isloading) return (
   <Loader/>
  );
  if (temperature.length < 5 || pressure.length <5 || gas.length <5 || altitude.length <5) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Insufficient Proper Data</h2>
          <p className="text-gray-600 mb-6">
            The data for your specific device is insufficient. Please ensure
            that your hardware device is turned on and try again later.
          </p>
          <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300"
            onClick={() => {
        window.location.reload()
          }}
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="flex items-start justify-center bg-slate-900"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        {/* DataBox on the left */}
        <div className="w-1/5 p-4 flex flex-col">
          <DataBox data={dataBox} />
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
