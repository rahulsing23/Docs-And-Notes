import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import LogoIcon from '@/assets/icons/Docs&Notes.png';
import { useEffect, useRef, useState } from 'react';
import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import WorkspaceCard from '@/components/WorkspaceCard';


export default function DashboardPage() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);
  const [totalWorkspace, setTotalWorkspace] = useState(0);
  const [inputquery, setInputquery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalDocument, setTotalDocument] = useState(0);
  const Inputref = useRef();


  const countDocumentsInCollection = async (collectionName) => {
    try {
     
      const queryForWorkpsace = query(collection(db, collectionName), where('createBy', '==', user?.primaryEmailAddress.emailAddress))
      const querySnapshot = await getDocs(queryForWorkpsace);
      const queryForDocument = query(collection(db , "workspaceDocument"), where('createdBy', '==', user?.primaryEmailAddress.emailAddress))
      const docSnapShot = await getDocs(queryForDocument)
      const workspaceData = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWorkspaceList(workspaceData);
      setTotalWorkspace(querySnapshot.size);
      setTotalDocument(docSnapShot.size)
    } catch (error) {
      console.error('Error counting documents: ', error);
    }
  };

  const handleSearchedQuery = async () => {
    const q = query(
      collection(db, 'workspace'),
      and(
        where('createBy', '==', user?.primaryEmailAddress.emailAddress),
        or(
          where('tags', '==', inputquery.toLowerCase()),
          where('workspaceName', '==', inputquery.toLowerCase())
        )
      )
    );
    const querySnapshot = await getDocs(q);
    const Output = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWorkspaceList(Output);
  };

  useEffect(() => {
    const handleTyping = (event) => {
      if (Inputref.current) {
        Inputref.current.focus();
        setSearchQuery((prevQuery) => prevQuery + event.key);
      }
    };

    !inputquery && countDocumentsInCollection('workspace');

    document.addEventListener('keydown', handleTyping);

    return () => {
      document.removeEventListener('keydown', handleTyping);
    };
  }, [searchQuery]);

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: 'w-10 h-10 ',
      userButtonPopoverCard: 'bg-blue-100',
      userButtonPopoverActionButton: 'text-red-600',
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-[#070f20] text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src="./gif2.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Sidebar */}
      <div className="relative z-20 flex flex-col items-center lg:w-[20%] w-full bg-[#070f20] py-5 lg:min-h-screen shadow-lg">
        {/* Logo */}
        <div className="w-40 mt-6">
          <img src={LogoIcon} alt="Logo" />
        </div>
        
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 p-6 flex flex-col space-y-6 lg:w-[80%] w-full rounded-l-3xl  shadow-white shadow-3xl">
        {/* Search and New Workspace Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 w-full">

          <Input
            ref={Inputref}
            className="w-full md:w-1/2 p-3 bg-gray-700 text-white placeholder:text-white border border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 bg-opacity-50"
            placeholder="Search for Workspaces..."
            onChange={(e) => setInputquery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchedQuery();
            }}
          />
          </div>

           {/* New Workspace Button and SignOut Button */}
           <div className="flex space-x-4">
            <Link to="/createworkspace">
              <Button className="bg-green-600 px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all text-white">+ New Workspace</Button>
            </Link>
            <SignOutButton>
              <Button variant="secondary" className="rounded-lg shadow-md px-6 py-2">Sign Out</Button>
            </SignOutButton>
          </div>
        </div>

        {/* Workspace Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Workspace Count */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all hover:scale-105">
            <h1 className="text-5xl font-bold">{totalWorkspace}</h1>
            <p className="text-xl text-green-400 mt-2">Workspaces Available</p>
          </div>

          {/* Document Count */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all hover:scale-105">
            <h1 className="text-5xl font-bold">{totalDocument}</h1>
            <p className="text-xl text-green-400 mt-2">Documents Available</p>
          </div>

          <div className="bg-black bg-opacity-50 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all hover:scale-105">
            {/* <h1 className="text-5xl font-bold">{totalDocument}</h1>
            <p className="text-xl text-green-400 mt-2">Documents Available</p> */}
            {/* User Info */}
           
              <UserButton appearance={userButtonAppearance}/>
              <h1 className="text-xl text-white mt-2">{user?.fullName}</h1>
       
          </div>
        </div>

        {/* Workspace List */}
        <ScrollArea className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {workspaceList.map((workspace, index) => (
              <WorkspaceCard key={index} workspaceSnap={workspace} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
