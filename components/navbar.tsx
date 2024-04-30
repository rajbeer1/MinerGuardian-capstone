"use client"
import Link from 'next/link';
import Avatar from 'react-avatar'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast,{Toaster} from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { jwtDecode } from '@/helpers/jwt';
import axiosClient from '@/helpers/axios';

const Navbar = () => {
  const router = useRouter()
  const SOS = async() => {
    try {
      const data = await axiosClient.post(
        `/sos`,
        { type: 'Self' },
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
    } catch (error) {
      console.log(error)
      toast.error("error sending the SOS ,try again pls",{ position: 'top-left' })
    }
  }
  const logout = () => {
  try {
    Cookies.remove('user');
    router.refresh()
    
  } catch (error) {
    toast.error('error while logging out')
  }
  }
   const data =jwtDecode()
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 10000,
        }}
      ></Toaster>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-around',

          background: '#D1D5DB',
          position: 'fixed',
          height: '60px',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Link href="/home">
          <div
            className="text-xl font-medium hover:text-violet-600 "
            style={{ padding: '1rem' }}
          >
            Home
          </div>
        </Link>
       
        <Link href="/map">
          <div
            className="text-xl font-medium hover:text-violet-600"
            style={{ padding: '1rem' }}
          >
            Map
          </div>
        </Link>
        <Dialog>
          <DialogTrigger>
            <div
              className="text-xl font-medium hover:text-violet-600"
              style={{ padding: '1rem' }}
            >
              SOS
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>SOS</DialogTitle>
              <DialogDescription className="font-semibold">
                Do you want to send SOS to the admin
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-center w-full p-4">
              <DialogClose>
                <Button
                  type="button"
                  onClick={SOS}
                  className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 w-full rounded"
                >
                  Yes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Avatar
              size="50px"
              className="rounded-lg hover:cursor-pointer "
              style={{ padding: '0.2rem' }}
              name={data?.id}
            ></Avatar>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Log out</DialogTitle>
              <DialogDescription className="font-semibold">
                Do you want to logout
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              <DialogClose>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={logout}
                  className="text-red-600"
                >
                  Yes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </nav>
    </div>
  );
};

export default Navbar;
