import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';

import { ScrollArea } from '@/components/ui/scroll-area';

import LogoIcon from '@/assets/icons/Logo5.jpg';
import { useState } from 'react';
import Tags from '@/components/Tags';

export default function DashboardPage() {
  const { user } = useUser();
  const [totalworkspace, setTotalworkspace] = useState(0);



  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: 'w-10 h-10',
      userButtonPopoverCard: 'bg-blue-100',
      userButtonPopoverActionButton: 'text-red-600',
    },
  };

  return (
    <div className="bg-[#070f20] w-full h-screen flex ">
      {/* Note Left Section */}
      <div className="w-[20%] flex flex-col justify-between">
        {/* NOTE LOGO */}
        <div className="p-5 ml-2 mt-2">
          <div className="w-[150px]">
            {' '}
            <img src={LogoIcon} alt="" />
          </div>
        </div>

        <div className="w-full h-[80px]  cursor-pointer border-t-2 border-black shadow-lg text-white flex gap-3 justify-start items-center p-5">
          <UserButton appearance={userButtonAppearance} />
          <h1 className="text-xl">{user?.fullName}</h1>
        </div>
      </div>
      {/* Note Right Section */}

      <div className="w-full ">
        <div className="relative min-h-screen overflow-hidden rounded-l-[50px]">
          {/* Note Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="./gif2.mp4" type="video/mp4" />
          </video>

          {/* Overlay Container */}
          <div className="absolute inset-0 flex justify-center bg-black bg-opacity-20 text-white">
            {/* Note {SearchBar, Workspace} */}
            <div className="w-[70%] flex  flex-col items-center">
              {/* Note {SearchBar} */}
              <div className="w-[600px] p-5 rounded-lg">
                <Input
                  className="bg-[#061129] rounded-xl border-blue-950 focus:outline-none text-center"
                  placeholder="Explore"
                />
              </div>
              <div className=" w-full h-screen">
                <ScrollArea className=" h-screen w-full rounded-md  p-4">
                  {/* FIXME: FIXME Here */}
                </ScrollArea>
              </div>
            </div>

            {/* Note Card  & NewButton*/}
            <div className="w-[30%] flex flex-col justify-start gap-10 p-5">
              <div className=" w-[300px] h-[80px]  flex items-center justify-center gap-5 bg-black rounded-3xl">
                <Link to="/createworkspace">
                  <Button className=" bg-rose-600 rounded-2xl" >
                    +New WorkSpace
                  </Button>
                </Link>
                <SignOutButton>
                  <Button variant="secondary" className="rounded-2xl w-[100px]">
                    Signout
                  </Button>
                </SignOutButton>
              </div>
              <div className="w-full h-screen flex flex-col justify-evenly gap-10">
                <div className="bg-black opacity-50 w-full h-[200px]  p-5 flex flex-col gap-10">
                  <h1 className='text-7xl text-white '>{totalworkspace}</h1>
                  <p className='text-xl text-rose-700 font-bold'>Total number of WorkSpace</p>
                </div>
                <div className="bg-black opacity-50 w-full h-[300px] text-white  p-5 flex flex-col justify-center items-center ">
                  <h1 className="text-3xl font-bold">Recently Visited</h1>
                  <Tags/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

