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
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { jwtDecode } from '@/helpers/jwt';

const Navbar = () => {
  const router = useRouter()
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
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
     
      background: '#D1D5DB',
      position: 'fixed', 
      height:"60px",
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 1000, 
    }}>
      <Link href="/home">
        <div className='text-xl font-medium hover:text-violet-600 ' style={{ padding: '1rem' }}>Home</div>
      </Link>
      <Link href="/photo">
 <div className='text-xl font-medium hover:text-violet-600' style={{ padding: '1rem' }}>imaging</div>
      </Link>
      <Link href="/map">
         <div className='text-xl font-medium hover:text-violet-600' style={{ padding: '1rem' }}>Map</div>
      </Link>
      <Link href="/portfolio">
 <div className='text-xl font-medium hover:text-violet-600' style={{ padding: '1rem' }}>SOS</div>
      </Link>
      
         <Dialog>
      <DialogTrigger asChild>
       <Avatar size='50px' className='rounded-lg hover:cursor-pointer ' style={{ padding: '0.3rem' }} name={data?.id }></Avatar>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log out</DialogTitle>
          <DialogDescription className='font-semibold'>
            Do you want to logout 
          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={logout} className='text-red-600'>
              Yes
              </Button>
              
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      
    </nav>
  );
};

export default Navbar;
