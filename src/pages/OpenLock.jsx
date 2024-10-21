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
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import uuid4 from 'uuid4';
import { Loader2Icon } from 'lucide-react';
const OpenLock = () => {
  const { workspaceName } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const OpenLockHandler = async () =>{
    try {
      
      setLoading(true)
      const q =  query(collection(db, "secureworkspace"), where("password","==",password))
      const querySnapshot = await getDocs(q);
      if(querySnapshot.docs.length !== 0){

        const Output = querySnapshot.docs
          .filter((doc) => {
            return doc.data().workspaceId == id.toString();
          })
          console.log(Output[0].id)
  
          await deleteDoc(doc(db, "secureworkspace", Output[0].id.toString()))
          navigate("/")
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
    <div className="flex items-center justify-center w-full h-screen">
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
                        value={workspaceName}
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
                  disabled={!workspaceName || loading}
                  onClick={OpenLockHandler}
                >
                  Remove Lock
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

export default OpenLock
