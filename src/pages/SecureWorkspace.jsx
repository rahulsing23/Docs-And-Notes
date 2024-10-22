import React, { useState } from 'react';
import WolfImage from '@/assets/Images/wolf.jpg';
import { FaLock } from 'react-icons/fa';
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
import { useLocation, useNavigate } from 'react-router-dom';
import {  doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import uuid4 from 'uuid4';
import { Loader2Icon } from 'lucide-react';
import Navbar from '@/components/Navbar';
const SecureWorkspace = () => {

  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const location = useLocation()
  const workspaceSnap = location.state; 

  const handleSecure = async () => {
    try {
      if (password === '' || confirmPassword === '') {
        setError('Fill all the Password fields');
      } else {
        if (password !== confirmPassword) {
          setError('Password and Confirm password are not match');
        }
        if (password === confirmPassword) {
          const secureId = uuid4();
          setLoading(true)
          
          await setDoc(doc(db, 'secureworkspace', secureId.toString()), {
            workspaceName: workspaceSnap.workspaceName,
            workspaceId: workspaceSnap.workspaceId.toString(),
            password: password,
            isValidOpen: false,
          });
          setLoading(false)
          navigate('/');
        }
        
      }
    } catch (error) {
      console.log('Error in handle secure :: ', error.message);
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <div className="flex flex-col gap-[50px] justify-start items-center w-full h-screen">
      <Navbar/>
      <div className="flex  w-[60%] h-[75%]  shadow-2xl">
        <div className="w-[50%] h-full border-r-2 flex flex-col items-center">
          <div className="w-full h-full flex p-5 ">
            <Card className="w-full h-full flex flex-col py-[40px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-5">
                  <FaLock /> Workspace Lock
                </CardTitle>
                <CardDescription>
                  Secure your workspace with password security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Name of your project"
                        className="capitalize"
                        value={workspaceSnap.workspaceName}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="Password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button
                  disabled={!workspaceSnap.workspaceName || loading}
                  onClick={handleSecure}
                >
                  Secure
                  {loading && <Loader2Icon className="animate-spin ml-2" />}
                </Button>
              </CardFooter>
              <h2 className="text-md text-red-600 text-center">{error}</h2>
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
