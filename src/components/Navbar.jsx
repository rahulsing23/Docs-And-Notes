import React from 'react';
import LogoIcon from '@/assets/icons/Docs&Notes.png';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: 'w-10 h-10',
      userButtonPopoverCard: 'bg-blue-100',
      userButtonPopoverActionButton: 'text-black-600',
    },
  };
  const { user } = useUser();

 
  return (
    <div className="shadow-md flex justify-between items-center w-full h-[70px] p-5 bg-[#070f20]">
      <Link to="/">
        <img src={LogoIcon} alt="Keep Notes" height={80} width={150} />
      </Link>

    
      <div className="flex justify-center items-center gap-3">
        <UserButton appearance={userButtonAppearance} />
        <h1 className="text-white">{user?.fullName}</h1>
      </div>
    </div>
  );
};

export default Navbar;
