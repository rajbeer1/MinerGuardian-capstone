"use client"
import Navbar from "@/components/navbar";
import SocketClient from '@/helpers/socket'
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast,{Toaster} from "react-hot-toast";
import axiosClient from "@/helpers/axios";
import { headers } from "next/headers";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
  }) {
function speak(data: any) {
  const utterance = new SpeechSynthesisUtterance(data);
  const voices = speechSynthesis.getVoices();
  console.log(voices[97]);
  utterance.voice = voices[97]; 
  speechSynthesis.speak(utterance);
}
useEffect(() => {
  SocketClient.connect();
  SocketClient.subscribeTo('SOS-temp', (data: any) => {
     speak(data.message.title)
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-purple-200 to-indigo-200 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1  w-0 p-4 ">
          <div className="flex items-start">
            <div className="ml-1 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {data.message.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{data.message.data}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={async () => {

              const data = await axiosClient.post(
                `/sos`,
                { type: 'temperature' },
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('user')}`,
                  },
                }
              );
              if (data) {
                toast.success('SOS request is sent ', { position: 'top-left' });
                console.log(data);
              }
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Help
          </button>
          <button
            onClick={async () => {

              const change = await axiosClient.post('/sos/fine',{}, {
                headers: {
                  Authorization: `Bearer ${Cookies.get('user')}`,
                },
              });
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            It's fine
          </button>
        </div>
      </div>
    ));

    console.log(data.message.data);
  });
  SocketClient.subscribeTo('SOS-gas', (data: any) => {
   speak(data.message.title);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-1 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {data.message.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{data.message.data}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={async () => {
              const data = await axiosClient.post(
                `/sos`,
                { type: 'gas' },
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('user')}`,
                  },
                }
              );
              if (data) {
                toast.success('SOS request is sent ', { position: 'top-left' });
                console.log(data);
              }
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Help
          </button>
          <button
            onClick={async () => {

              const change = await axiosClient.post('/sos/fine', {},{
                headers: { Authorization: `Bearer ${Cookies.get('user')}` },
              });
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            It's fine
          </button>
        </div>
      </div>
    ));

    console.log(data.message.data);
  });
  SocketClient.subscribeTo('SOS-vibration', (data: any) => {
   speak(data.message.title);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-1 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {data.message.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{data.message.data}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={async () => {
              const data = await axiosClient.post(
                `/sos`,
                { type: 'vibration' },
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('user')}`,
                  },
                }
              );
              if (data) {
                toast.success('SOS request is sent ', { position: 'top-left' });
                console.log(data);
              }
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Help
          </button>
          <button
            onClick={async () => {

              const change = await axiosClient.post('/sos/fine',{}, {
                headers: { Authorization: `Bearer ${Cookies.get('user')}` },
              });
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            It's fine
          </button>
        </div>
      </div>
    ));

    console.log(data.message.data);
  });
  return () => {
    SocketClient.socket.off('SOS-temp');
    SocketClient.socket.off('SOS-vibration');
    SocketClient.socket.off('SOS-gas');

  };
}, []);
  return (
    <div>
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 10000,
        }}
      ></Toaster>
      <div className="mt-[60px]">{children}</div>
    </div>
  );
}