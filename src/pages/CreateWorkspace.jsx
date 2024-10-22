import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CoverPicker from './CoverPicker';
import { db } from '@/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore';
import {  useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import WorkspaceTags from "@/components/WorkspaceTags"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { GiCancel } from "react-icons/gi";
function CreateWorkspace() {
  const  defualtImage = "https://img.freepik.com/free-photo/beautiful-blooming-trees-town-spring-season_23-2150790468.jpg?t=st=1728579627~exp=1728583227~hmac=8edaecad2df87004c3c4fb3aa5c76fcc848e6ccd9afcb23c0607c0a838ba0e56&w=1060"
  const [coverImage, setCoverImage] = useState(defualtImage)
  const [workspaceName, setWorkspaceName] = useState();

  const { user } = useUser()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tags, settags] = useState();
  const navigate = useNavigate()
//  create  workspace and save in firebase db
   const OnCreateWorkspace = async () =>{

    try {
      const workspaceId = Date.now()
      setLoading(true)

      await setDoc(doc(db, "workspace", workspaceId.toString()), {
        workspaceId: workspaceId,
        workspaceName: workspaceName.toLowerCase(),
        coverImage: coverImage,
        createBy: user?.primaryEmailAddress.emailAddress,
        tags: tags.toLowerCase()
      })

      setLoading(false) 
      navigate(`/workspace/${workspaceName}/`+workspaceId)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
   }


  return (
    <div className="p-10  md:px-36 lg:px-64 xl:px-96 py-28">
      {
          error && <Alert className="mb-5">
          <GiCancel  className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
        }
      <div className="shadow-2xl rounded-xl">
        
      
        <CoverPicker setNewCover={(v)=>setCoverImage(v)}>
        <div className="relative group cursor-pointer">
          <h2 className="hidden absolute p-4 w-full h-full  items-center justify-center group-hover:flex">
            Change Cover
          </h2>
          <div className="group-hover:opacity-40 cursor-pointer">
            <img
              src={coverImage}
              alt="Cover Image"
              width={400}
              height={400}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
          </div>
        </div>
        </CoverPicker>
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="mt-2 text-sm">
            This is a shared space where you can collaborate with your team. You
            can always rename it later.
          </h2>
          <div className="mt-8 flex items-center gap-2">
            
            <WorkspaceTags TagSelected={(v) => settags(v)}/>

            
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName || loading}
              onClick={OnCreateWorkspace}
            >Create {loading && <Loader2Icon className="animate-spin ml-2" />}</Button>
            <Link to="/"><Button variant="outline">Cancel</Button></Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;

