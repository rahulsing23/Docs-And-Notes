import { db } from "@/firebase/firebase";
import { useAuth } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";
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
        setWorkspaceExists(true); 
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

