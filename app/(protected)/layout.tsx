"use client"
import Navbar from "@/components/navbar";
import SocketClient from '@/helpers/socket'
import { useEffect } from "react";
import toast,{Toaster} from "react-hot-toast";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
  }) {
   
useEffect(() => {
  SocketClient.connect();
  SocketClient.subscribeTo('SOS', (data: any) => {
   
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
             onClick={() => {
               
               toast.dismiss(t.id);
             }}
             className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
           >
             Send Help
           </button>
           <button
             onClick={() => {
               // Handle 'I am OK' action
               toast.dismiss(t.id);
             }}
             className="w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
           >
             I am OK
           </button>
         </div>
       </div>
     ));
   
  console.log(data.message.data)
  });
  return () => {
    SocketClient.socket.off('SOS');
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