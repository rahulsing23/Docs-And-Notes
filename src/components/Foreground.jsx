import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import { Button } from './ui/button';
import { Link, useParams } from 'react-router-dom';
import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { Input } from './ui/input';

const Foreground = () => {
  const { id, workspaceName } = useParams();
  const [documentList, setDocumentList] = useState([]);
  const [inputquery, setInputquery] = useState('');
  const Inputref = useRef();

  const DocumentFromCollection = async () => {
    try {
      const q = query(
        collection(db, 'workspaceDocument'),
        where('workspaceId', '==', id.toString())
      );
      const querySnapshot = await getDocs(q);
      const documentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocumentList(documentData);
    } catch (error) {
      console.log(' Error in Document Data :: ', error.message);
    }
  };

  const handleSearchedQuery = async () => {
    try {
      const q = query(
        collection(db, 'workspaceDocument'),
        and(
          where('workspaceId', '==', id.toString()),
          or(
            where('title', '==', inputquery.toLowerCase()),
            where('priority', '==', inputquery.toLowerCase())
          )
        )
      );
      const querySnapshot = await getDocs(q);
      const Output = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocumentList(Output);
    } catch (error) {
      console.log(
        'Error in handleSearchQuery function of Foreground :: ',
        error.message
      );
    }
  };

  useEffect(() => {
    DocumentFromCollection();
    Inputref.current?.focus();
  }, []);

  return (
    <div className="w-full h-screen p-5 flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex items-center">
          <h1 className="text-base md:text-xl font-semibold text-[#070f20] bg-white p-2 rounded-l-lg border-2">
            Workspace:
          </h1>
          <h1 className="text-base md:text-xl font-semibold text-white bg-[#fe0039] p-2 rounded-r-lg border-none selection:text-cyan-400">
            {workspaceName}
          </h1>
        </div>
        <div className="w-full md:w-[600px] p-5 md:p-0">
          <Input
            ref={Inputref}
            className="bg-[#061129] bg-opacity-50 rounded-xl border-blue-950 focus:outline-none text-center text-white placeholder:text-white"
            placeholder="Explore"
            onChange={(e) => setInputquery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchedQuery();
            }}
          />
        </div>
        <Link to={`/workspace/${workspaceName}/${id}/create-document`}>
          <Button className="bg-rose-600 rounded-lg h-[50px] w-full md:w-[150px] mt-4 md:mt-0">
            +New Notes
          </Button>
        </Link>
      </div>

      <div className="w-full h-full top-0 left-0 z-[3] p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {documentList.map((doc, index) => (
            <div
              className="flex gap-5 shadow-2xl flex-wrap-reverse justify-evenly rounded-lg"
              key={index}
            >
              <Card document={doc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foreground;
