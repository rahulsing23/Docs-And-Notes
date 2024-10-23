import { db } from "@/firebase/firebase";
import { useAuth } from "@clerk/clerk-react";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const WorkSpaceLayout = () => {
  const { id } = useParams(); // Get dynamic route param (workspace ID)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State to track loading
  const [workspaceExists, setWorkspaceExists] = useState(false); // State to track if workspace exists

  const checkWorkspace = async () => {
    try {
      const docSnap = await getDoc(doc(db, "workspace", id.toString()));
      if (!docSnap.exists()) {
        
        navigate("/"); 
      } else {
        
        const q = query(collection(db, "secureworkspace"), where("workspaceId", '==', id.toString()))
        const isAvailable = await getDocs(q);
        if(isAvailable.empty)
        {
          setWorkspaceExists(true); 
        }
        else{
          console.log("hello:",isAvailable.docs[0].data().isValidOpen)
          const snapShot = isAvailable.docs[0].data().isValidOpen
           if(snapShot)
           {
            setWorkspaceExists(true); 
            await updateDoc(doc(db, "secureworkspace", isAvailable.docs[0].id.toString()), {
              isValidOpen: false,
            })
           }
           else{
            navigate("/")
           }

        }
       
      
       
      }
    } catch (error) {
      console.error("Error fetching workspace:", error);
      navigate("/"); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkWorkspace();
  }, [id]); 

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
  return workspaceExists ? <Outlet/> : null;
};

export default WorkSpaceLayout;

