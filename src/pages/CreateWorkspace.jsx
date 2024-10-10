
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CoverPicker from './CoverPicker';
import {db} from '@/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore';

import DefaultCoverImage from "@/assets/Images/coverDefault.jpg"
import uuid4 from 'uuid4';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState(DefaultCoverImage);
  const [workspaceName, setWorkspaceName] = useState();
  // const [emoji, setemoji] = useState();
  const { user } = useUser()
  const {orgId} = useAuth()
  const [loading, setLoading] = useState(false);

//  create  workspace and save in firebase db
   const OnCreateWorkspace = async () =>{
  //   try {
  //     const workspaceId = Date.now()
      
  //     setLoading(true)
  //       await setDoc(doc(db, "Workspace", workspaceId.toString()),{
  //       name: workspaceName ,
  //       emoji: emoji || '&#128512;' ,
  //       coverImage: coverImage ,
  //       createdby: user?.primaryEmailAddress?.emailAddress,
  //       id: workspaceId,
  //       orgId: orgId ? orgId :  user?.primaryEmailAddress?.emailAddress
  //     });
      
  //     const docId = uuid4();
  //     await setDoc(doc(db, "workspaceDocuments", docId.toString()),{
  //       workspaceId:workspaceId,
  //       coverImage: coverImage,
  //       createdby: user?.primaryEmailAddress.emailAddress,
  //       emoji:null,
  //       id: docId,
  //       documentOutput: []
  //     })
      
  //     await setDoc(doc(db, "documentOutput", docId.toString()),{
  //       id: docId,
  //       output: []

  //     })

  //     setLoading(false)
  //     router.replace("/workspace/"+workspaceId+"/"+docId);
      
  //   } catch (error) {
  //     console.log(error.message)
  //     setLoading(false)
  //   }

 }
  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
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
            {/* <EmojiPickerComponent setEmojiIcon={(v)=>setemoji(v)}>
            <Button variant="outline">
              {emoji ? emoji : <SmilePlus />}
            </Button>
            </EmojiPickerComponent> */}
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

