import React, { useEffect } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db, storage } from '@/firebase/firebase';
import { Link } from 'react-router-dom';
import {  ref, deleteObject } from "firebase/storage";



const WorkspaceCard = ({ workspaceSnap }) => {

  const handleDeleteWorkspace = async () => {
    try {
      
      const q = query(
        collection(db, 'workspaceDocument'),
        where('workspaceId', '==', workspaceSnap.workspaceId.toString())
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        console.log(document.data().downloadURL)
        if(document.data().downloadURL){
          const desertRef = ref(storage, `uploads/${document.data().uploadedfileName}`);
  
            // Delete the file
           await deleteObject(desertRef).then(() => {
              console.log("File delete successfully")
            }).catch((error) => {
              console.log('Error in handle storage data deletion function :: ', error.message);
            });
        }
        await deleteDoc(doc(db, 'workspaceDocument', document.id));
      });

      await deleteDoc(doc(db, 'workspace', workspaceSnap.workspaceId.toString()));
      location.reload();
    } catch (error) {
      console.log('Error in handleDeleteWorkspace :: ', error.message);
    }
  };

  return (
    <div className=" shadow-red-950 rounded-3xl w-[250px] border-blue-950 border-[1px]">
      <Link to={`/workspace/${workspaceSnap.workspaceName}/${workspaceSnap.workspaceId}`}>
        <div className="relative group cursor-pointer">
          <div className="group-hover:opacity-40 cursor-pointer ">
            <img
              src={workspaceSnap.coverImage}
              alt="Cover Image"
              width={400}
              height={400}
              className="w-full h-[150px] object-cover  rounded-t-3xl"
            />
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center  capitalize ">
        <Link to={`/workspace/${workspaceSnap.workspaceName}/${workspaceSnap.workspaceId}`}>
          <div className="p-5 shadow-2xl hover:text-orange-600">
            <h2 className="font-medium text-2xl">{workspaceSnap.workspaceName}</h2>
            <h2 className="mt-2 text-sm">{workspaceSnap.tags}</h2>
          </div>
        </Link>
        <div className="mt-8 flex items-center gap-2 pr-4">
          <DropdownMenu className="">
            <DropdownMenuTrigger>
              <SlOptionsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-transparent bg-opacity-50 border-black bg-black text-white">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup value="bottom">

                {/*Note open */}
                <DropdownMenuRadioItem className="focus:text-green-600">
                <Link to={`/workspace/${workspaceSnap.workspaceName}/${workspaceSnap.workspaceId}`}> Open </Link> 
                </DropdownMenuRadioItem>

                {/*Fixme: Secure */}
                <DropdownMenuRadioItem><Link to={`/workspace/${workspaceSnap.workspaceName}/${workspaceSnap.workspaceId}/secure`}>Secure</Link></DropdownMenuRadioItem>

                {/* Note Delete */}

                <DropdownMenuRadioItem
                  className="focus:text-red-600"
                  onClick={handleDeleteWorkspace}
                >
                  Delete
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
