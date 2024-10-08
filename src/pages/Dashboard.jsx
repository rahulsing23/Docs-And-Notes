import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Foreground from '../components/Foreground';
import { GiHamburgerMenu, GiMagnifyingGlass } from 'react-icons/gi';
import Logo from '@/components/Logo';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { motion } from "framer-motion"

export default function DashboardPage() {
  const {user} = useUser()
  function generateUsername(firstName, lastName) {
    // Remove spaces and convert to lowercase
    firstName = firstName.trim().toLowerCase();
    lastName = lastName.trim().toLowerCase();
    
    // Generate a random number (optional)
    const randomNumber = Math.floor(Math.random() * 1000);
    
    // Create a username by combining first and last name with a random number
    const username = `${firstName}.${lastName}${randomNumber}`;
    
    return username;
  }
  return (
    <div className='flex '>
      {/* <Navbar /> */}
      <div className="w-[18%] h-screen border-r-2 p-5">
        {/* Logo */}
        <div className="w-[190px]"><Logo/></div>

        <hr className='mt-3'></hr>

        <div className="flex flex-col mt-5">
          <Button className="h-[50px] bg-primary text-lg">+New</Button>
        </div>
      </div>

      {/* Right side */}
      <div className="w-[60%] flex flex-col ">
        {/* Explore Navbar */}
        <div className="h-[4vw] border-b-2 flex justify-center items-center p-5">
          <Input 
            className="w-[60%]  text-center rounded-3xl font-medium focus:outline-none focus:border-blue-300" 
            placeholder="Explore"
          />
        </div>
      </div>

      <div className="w-[22%] border-l-2 flex items-start justify-center">
        <div className=" h-[200px] w-[300px] m-5 p-5 flex flex-col items-center justify-center border-2 rounded-3xl">
            <img src={user?.imageUrl} alt="" className='rounded-full p-5 h-[150px]'  />
            <h1 className='text-xl font-medium text-pink-500'>{user?.fullName}</h1>
        </div>
      </div>
      
    </div>
  );
}
