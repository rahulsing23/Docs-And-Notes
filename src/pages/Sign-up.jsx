import { SignUp } from '@clerk/clerk-react';
import WolfImage from '@/assets/Images/wolf.jpg';
import { Link } from 'react-router-dom';
import LogoIcon from '@/assets/icons/Docs&Notes.png';
export default function SignUpPage() {
  return (
    <section className="bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 shadow-md flex justify-between items-center w-full h-[70px] p-5 bg-[#070f20] z-50">
      <img src={LogoIcon} alt="Keep Notes" height={80} width={150} />
        <Link to="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
        </Link>
      </div>
      {/* Main Content */}
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 mt-[70px]">
        <aside className="relative hidden lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 lg:block">
          <img
            alt=""
            src={WolfImage}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div>
              <SignUp path="/sign-up" />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
