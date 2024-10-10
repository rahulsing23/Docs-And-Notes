
import { SignIn } from '@clerk/clerk-react'
import WolfImage from "@/assets/Images/wolf.jpg"
export default function SignInPage() {
  return (
    <div className="h-[100vh] w-[vw] flex items-center justify-center">
      <div className="h-[480px] bg-white border-2 border-white text-opacity-90 shadow-2xl 
      w-[80vw] md:w-[90vw] lg:[70vw] xl:w-[51vw] rounded-3xl grid xl:grid-cols-2">
         <div className=""><SignIn path="/sign-in"/></div>
         <div className="">
          <img src={WolfImage} alt="" className='h-full w-full'/>
         </div>
      </div>
     
    </div>
  );
}