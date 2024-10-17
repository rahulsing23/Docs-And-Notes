import React, { useState } from 'react';
import WolfImage from '@/assets/Images/wolf.jpg';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useParams } from 'react-router-dom';

const SecureWorkspace = () => {
  const {workspaceName} = useParams()
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSecure = () =>{
    try {
      if(password === "" || confirmPassword === "")
      {
        setError("Fill all the Password fields")
      }
      else{
        if(password !== confirmPassword)
        {
           setError("Password and Confirm password are not match")
           return ;
        }
        if(password === confirmPassword){

        }
      }
    } catch (error) {
      console.log("Error in handle secure :: ", error.message)
    }
    
    
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex  w-[60%] h-[75%]  shadow-2xl">
        <div className="w-[50%] h-full border-r-2 flex flex-col items-center">
          <div className="w-full h-full flex p-5 ">
            <Card className="w-full h-full flex flex-col py-[40px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-5"><FaLock/> Workspace Lock</CardTitle>
                <CardDescription>
                  Secure your workspace with password security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" className="capitalize" value={workspaceName} disabled/>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="Password">Password</Label>
                      <Input id="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
                <Button onClick={handleSecure}>Secure</Button>
              </CardFooter>
              <h2 className='text-md text-red-600 text-center'>{error}</h2>  
            </Card>
          </div>
        </div>
        <div className="w-[50%] h-full">
          <img src={WolfImage} alt="Side Image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SecureWorkspace;
