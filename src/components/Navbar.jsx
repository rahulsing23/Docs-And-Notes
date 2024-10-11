import React, { useEffect, useRef, useState } from 'react';
import LogoIcon from '@/assets/icons/Logo5.jpg';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Input } from './ui/input';

const Navbar = () => {
  const [inputquery, setInputquery] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const Inputref = useRef();

  useEffect(() => {
    // Function to handle typing events

    const handleTyping = (event) => {
      if (Inputref.current) {
        Inputref.current.focus();
        setSearchQuery((prevQuery) => prevQuery + event.key);
      }
    };

    // Add event listener for typing
    document.addEventListener('keydown', handleTyping);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleTyping);
    };
  }, [searchQuery]);

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
      <img src={LogoIcon} alt="Keep Notes" height={100} width={200} />
      <div className="w-[600px] p-5 rounded-lg">
        <Input
          ref={Inputref}
          className="bg-[#061129] bg-opacity-50 rounded-xl border-blue-950 focus:outline-none text-center text-white placeholder:text-white"
          placeholder="Explore"
          onChange={(e) => setInputquery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchedQuery();
          }}
        />
      </div>
      <div className="flex justify-center items-center gap-3">
        <UserButton appearance={userButtonAppearance} />
        <h1 className="text-white">{user?.fullName}</h1>
      </div>
    </div>
  );
};

export default Navbar;
