"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import  SocketClient  from "@/helpers/socket";
import toast from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
