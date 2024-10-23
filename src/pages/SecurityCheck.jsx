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
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { Loader2Icon } from 'lucide-react';
import Navbar from '@/components/Navbar';

const SecurityCheck = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const workspaceSnap = location.state;

  const handleCheckSecurity = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "secureworkspace"), where("password", "==", password), where("workspaceId", '==', workspaceSnap.workspaceId.toString()));
      const qs = await getDocs(q);

      if (qs.docs.length !== 0) {
        await updateDoc(doc(db, "secureworkspace", qs.docs[0].id.toString()), {
          isValidOpen: true
        });

        navigate(`/workspace/${workspaceSnap.workspaceName}/${workspaceSnap.workspaceId}`);
      } else {
        setError("Wrong Password");
      }
    } catch (error) {
      console.log("Error in handleSecurityCheck function :: ", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-12 w-full min-h-screen p-4">
      <Navbar />
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full shadow-2xl">
        <div className="w-full lg:w-1/2 h-full border-r-2 flex flex-col items-center">
          <div className="w-full h-full flex p-5">
            <Card className="w-full h-full flex flex-col py-10">
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
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
          <img src={WolfImage} alt="Side Image" className="object-cover w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default SecurityCheck;
