import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const Foreground = () => {
  const ref = useRef(null);
  const { id } = useParams()
  const [documentList, DocumentList] = useState([]);

  const DocumentFromCollection = async () =>{
    try {
      const q = query(collection(db, "workspaceDocument"),
      where('workspaceId', '==', id.toString())
      )
    
      const querySnapshot = await getDocs(q)
      const documentData = querySnapshot.docs.map((doc) =>(
        {
          id: doc.id,
          ...doc.data(),
        }
      ))
      DocumentList(documentData)
    } catch (error) {
      console.log(" Error in Document Data :: ", error.message)
    }
  }
  useEffect(() => {
    DocumentFromCollection()
  }, []);


  return (
    <div className='w-full h-screen p-5'>
      <div className="w-full h-[80px]  flex justify-end items-center">
       <Link to={`/workspace/${id}/create-document`}>
        <Button className="bg-rose-600 rounded-lg h-[50px] w-[150px]">+New Notes</Button>       
       </Link> 
      </div>
      <div ref={ref} className="w-full h-screen  top-0 left-0 z-[3] p-5">
        <div className="grid grid-cols-5 gap-5 mt-10">
          {
              documentList.map((doc, index)=>(
                <div className="flex gap-5 shadow-2xl flex-wrap-reverse justify-evenly">
                  <Card reference={ref} doc={doc} key={index}/>
                </div>
                
              ))
          }
          
        </div>
      </div>
    </div>
  );
};

export default Foreground;
