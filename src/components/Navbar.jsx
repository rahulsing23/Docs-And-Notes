import React from 'react'
import Logo from './Logo'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='shadow-md flex justify-between items-center w-full h-[70px] p-5'>
        <Logo />
        <UserButton className="p-5"/>
    </div>
  )
}

export default Navbar
