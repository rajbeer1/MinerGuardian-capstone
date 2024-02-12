"use client"
import React, { useEffect } from 'react';
import SocketClient from '@/helpers/socket'

import { Toaster,toast } from 'react-hot-toast';

const MyComponent: React.FC = () => {
 
useEffect(() => {
  SocketClient.connect();
  SocketClient.subscribeTo('SOS', (data: any) => {
    toast.success('hii');
    console.log('Received data:', data);
  });
  return () => {
    SocketClient.socket.off('SOS');
  };
}, []);
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 10000,
        }}
      ></Toaster>
      My Next.js Component
    </div>
  );
};

export default MyComponent;
