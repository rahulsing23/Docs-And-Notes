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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { Loader2Icon } from 'lucide-react';
import Navbar from '@/components/Navbar';

const SecurityCheck = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location  = useLocation();
  const workspaceSnap = location.state;

  const handleCheckSecurity = async () =>{
    try {
      
      setLoading(true)
      const q =  query(collection(db, "secureworkspace"), where("password","==",password), where("workspaceId", '==', workspaceSnap.workspaceId.toString()))
      const qs = await getDocs(q);
     
      if(qs.docs.length !== 0){
        await updateDoc(doc(db, "secureworkspace", qs.docs[0].id.toString()), {
          isValidOpen: true
        
        })
        
        navigate(`/workspace/${workspaceSnap.workspaceName}/${workspaceSnap.workspaceId}`)
      }
      else{
        setError("Wrong Password")
      }
    } catch (error) {
      console.log("Error in handleSecurityCheck function :: ", error.message);
      setError(error.message);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-start gap-[50px] w-full h-screen">
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
                
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button
                  disabled={!workspaceSnap.workspaceName || loading}
                  onClick={handleCheckSecurity}
                >
                  Open Workspace
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
  )
}

export default SecurityCheck
