'use client';
import React, { useEffect, useState } from 'react';
import { fetchsensordata } from '@/helpers/fetchSensordata';
import BarChartComponent from '@/components/graphs/recharts';
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

  if (isloading) return <Loader />;
  
  if (temperature.length < 5 || pressure.length < 5 || gas.length < 5 || altitude.length < 5) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Insufficient Proper Data</h2>
          <p className="text-gray-600 mb-6">
            The data for your specific device is insufficient. Please ensure that
            your hardware device is turned on and try again later.
          </p>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col lg:flex-row bg-slate-900 min-h-screen p-4 gap-4">
      <div className="w-full lg:w-1/4 lg:max-w-xs">
        <div className="sticky top-4">
          <DataBox data={dataBox} />
        </div>
      </div>
      <div className="w-full lg:w-3/4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { data: pressure, name: "pressure" },
            { data: gas, name: "gas" },
            { data: altitude, name: "altitude" },
            { data: temperature, name: "temperature" }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg shadow-md p-4 overflow-hidden">
              <div className="w-full h-[300px]">
                <BarChartComponent data={item.data} name={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home