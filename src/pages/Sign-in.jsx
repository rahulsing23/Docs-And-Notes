import { SignIn } from '@clerk/clerk-react';
import WolfImage from "@/assets/Images/wolf.jpg";
import { Link } from 'react-router-dom';
import LogoIcon from '@/assets/icons/Docs&Notes.png';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 shadow-md flex justify-between items-center w-full h-[70px] p-5 bg-[#070f20] z-50">
        <Link to="/">
        <img src={LogoIcon} alt="Keep Notes" height={80} width={150} />
        </Link>
        <Link to="/sign-up">
          <Button className="bg-white text-black hover:bg-gray-200 rounded-lg">
            Sign Up
          </Button>
        </Link>
      </div>

      {/* Sign In Form */}
      <div className="flex-grow flex items-center justify-center mt-[70px]">
        <div className="h-[480px] bg-white border-2 border-white text-opacity-90 shadow-2xl 
          w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[51vw] rounded-3xl grid xl:grid-cols-2">
          <div className="flex items-center justify-center">
            <SignIn path="/sign-in" />
          </div>
          <div className="hidden xl:block">
            <img src={WolfImage} alt="Wolf" className="h-full w-full object-cover rounded-r-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
