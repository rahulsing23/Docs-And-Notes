import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { Input } from './ui/input';

const Foreground = () => {
  const { id } = useParams();
  const [documentList, DocumentList] = useState([]);
  const [inputquery, setInputquery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const Inputref = useRef();
  const { workspaceName } = useParams();

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
      DocumentList(documentData);
    } catch (error) {
      console.log(' Error in Document Data :: ', error.message);
    }
  };

  const handleSearchedQuery = async () => {
    console.log(id, inputquery);
    try {
      const q = query(
        collection(db, 'workspaceDocument'),
        or(
          where('title', '==', inputquery.toLowerCase()),
          where('priority', '==', inputquery.toLowerCase())
        )
      );
      const querySnapshot = await getDocs(q);
      const Output = querySnapshot.docs
        .filter((doc) => {
          return doc.data().workspaceId == id.toString();
        })
        .map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
        }));

      DocumentList(Output);
      console.log(Output);
    } catch (error) {
      console.log(
        'Error in handleSearchQuery function of Foreground :: ',
        error.message
      );
    }
  };

  useEffect(() => {
    const handleTyping = (event) => {
      if (Inputref.current) {
        Inputref.current.focus();
        setSearchQuery((prevQuery) => prevQuery + event.key);
      }
    };

    !inputquery && DocumentFromCollection();

    document.addEventListener('keydown', handleTyping);

    return () => {
      document.removeEventListener('keydown', handleTyping);
    };
  }, [searchQuery]);

  return (
    <div className="w-full h-screen p-5">
      <div className="w-full h-[80px]  flex justify-between items-center">
        <div className="flex items-center justify-center">
        <h1 className="text-xl font-semibold capitalize text-orange-700 bg-green-300 p-2 rounded-l-lg border-none">workspace{' '}:</h1>
        <h1 className="text-xl font-semibold capitalize text-green-700 bg-orange-300 p-2 rounded-r-lg border-none selection:text-cyan-400">{workspaceName}</h1>

        </div>
        <div className="w-[600px] p-5 rounded-lg">
          <Input
            ref={Inputref}
            className="bg-[#061129] bg-opacity-50 rounded-xl border-blue-950 focus:outline-none text-center text-white placeholder:text-white "
            placeholder="Explore"
            onChange={(e) => setInputquery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchedQuery();
            }}
          />
        </div>
        <Link to={`/workspace/${id}/create-document`}>
          <Button className="bg-rose-600 rounded-lg h-[50px] w-[150px]">
            +New Notes
          </Button>
        </Link>
      </div>
      <div className="w-full h-screen  top-0 left-0 z-[3] p-5">
        <div className="grid grid-cols-5 gap-5 mt-10">
          {documentList.map((doc, index) => (
            <div
              className="flex gap-5 shadow-2xl flex-wrap-reverse justify-evenly rounded-lg"
              key={index}
            >
              <Card document={doc} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foreground;
