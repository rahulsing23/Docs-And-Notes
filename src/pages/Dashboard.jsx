import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import LogoIcon from '@/assets/icons/Logo5.jpg';
import { useEffect, useRef, useState } from 'react';
import Tags from '@/components/Tags';
import { collection, getDocs, or, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import WorkspaceCard from '@/components/WorkspaceCard';

export default function DashboardPage() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]); // State to store the document data
  const [totalWorkspace, setTotalWorkspace] = useState(0);
  const [inputquery, setInputquery] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const Inputref = useRef()

  // Add workspace
  const countDocumentsInCollection = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      // Convert documents to an array of data
      const workspaceData = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(), // Spreading document data and id
      }));

      // Setting the document list in state
      setWorkspaceList(workspaceData);
      setTotalWorkspace(querySnapshot.size); // Set the total number of documents
    } catch (error) {
      console.error('Error counting documents: ', error);
    }
  };

  // Search Query
  const handleSearchedQuery = async () =>{
    
    const q = query(collection(db, "workspace"),
      or(where('tags', '==', inputquery.toLowerCase()),
         where('workspaceName', '==', inputquery.toLowerCase())
      )
    );
    const querySnapshot = await getDocs(q);
    const Output = querySnapshot.docs.map((doc, index)=>(
      {
        id: doc.id,
        ...doc.data(),
      }
    )) 
    // setSearchedQueryOutput(Output)
    setWorkspaceList(Output) 
    console.log(Output)
  }


  useEffect(() => {
    // Function to handle typing events
    
    const handleTyping = (event) => {
      if (Inputref.current) {
        Inputref.current.focus();
        setSearchQuery((prevQuery) => prevQuery + event.key);
      }
    };
    
    !inputquery && countDocumentsInCollection('workspace');
    // Add event listener for typing
    document.addEventListener('keydown', handleTyping);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleTyping);
    };
  }, [searchQuery]);
 

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: 'w-10 h-10',
      userButtonPopoverCard: 'bg-blue-100',
      userButtonPopoverActionButton: 'text-red-600',
    },
  };

  return (
    <div className="bg-[#070f20] w-full h-screen flex ">
      {/* Note Left Section */}
      <div className="w-[20%] flex flex-col justify-between">
        {/* NOTE LOGO */}
        <div className="p-5 ml-2 mt-2">
          <div className="w-[150px]">
            {' '}
            <img src={LogoIcon} alt="" />
          </div>
        </div>

        <div className="w-full h-[80px]  cursor-pointer border-t-2 border-black shadow-lg text-white flex gap-3 justify-start items-center p-5">
          <UserButton appearance={userButtonAppearance} />
          <h1 className="text-xl">{user?.fullName}</h1>
        </div>
      </div>
      {/* Note Right Section */}

      <div className="w-full ">
        <div className="relative min-h-screen overflow-hidden rounded-l-[50px]">
          {/* Note Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="./gif2.mp4" type="video/mp4" />
          </video>

          {/* Overlay Container */}
          <div className="absolute inset-0 flex justify-center bg-black bg-opacity-20 text-white">
            {/* Note {SearchBar, Workspace} */}
            <div className="w-[70%] flex  flex-col items-center">
              {/* Note {SearchBar} */}
              <div className="w-[600px] p-5 rounded-lg">
                <Input ref={Inputref}
                  className="bg-[#061129] bg-opacity-50 rounded-xl border-blue-950 focus:outline-none text-center text-white placeholder:text-white"
                  placeholder="Explore"
                  onChange={(e)=>setInputquery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                        handleSearchedQuery();
                    }}                  
                />
              </div>
              {/* Note Workspace */}
              <div className=" w-full h-screen">
                <ScrollArea className=" h-[650px] w-full rounded-md  p-4">
                  <div className="flex gap-5 shadow-2xl flex-wrap-reverse justify-evenly ">
                  {workspaceList.map((doc, index) => (
                    <div className="flex  gap-5 " key={index}>
                      <Link to={`/workspace/${doc.workspaceId}`} >
                      <WorkspaceCard
                        coverImage={doc.coverImage}
                        workspaceName={doc.workspaceName}
                        tags={doc.tags}

                      />
                      </Link>
                    </div>
                  ))}
                  </div>
                  
                </ScrollArea>
              </div>
            </div>

            {/* Note Card  & NewButton*/}
            <div className="w-[30%] flex flex-col justify-start gap-10 p-5">
              <div className=" w-[300px] h-[80px]  flex items-center justify-center gap-5 bg-black bg-opacity-50 rounded-3xl">
                <Link to="/createworkspace">
                  <Button className=" bg-rose-600 rounded-2xl">
                    +New WorkSpace
                  </Button>
                </Link>
                <SignOutButton>
                  <Button variant="secondary" className="rounded-2xl w-[100px]">
                    Signout
                  </Button>
                </SignOutButton>
              </div>
              <div className="w-full h-screen flex flex-col justify-evenly gap-10">
                <div className="bg-black bg-opacity-50 w-full h-[200px]  p-5 flex flex-col gap-10">
                  <h1 className="text-7xl text-white">{totalWorkspace}</h1>
                  <p className="text-3xl text-rose-300 font-bold">
                     WorkSpace Available
                  </p>
                </div>
                <div className="bg-black bg-opacity-50 w-full h-[300px] text-white  p-5 flex flex-col justify-center items-center ">
                  <h1 className="text-3xl font-bold">Recently Visited</h1>
                  <Tags />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
