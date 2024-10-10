import React from 'react'
import LogoIcon from '@/assets/icons/Logo5.jpg'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='shadow-md flex justify-between items-center w-full h-[70px] p-5'>
        <img src={LogoIcon} alt="Keep Notes" />
        <UserButton className="p-5"/>
    </div>
  )
}

export default Navbar
