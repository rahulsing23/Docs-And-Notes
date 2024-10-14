import React, { useEffect, useState } from 'react';
import { FaEdit, FaLink } from 'react-icons/fa';

import { useUser } from '@clerk/clerk-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MdDeleteForever } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const Card = ({ document }) => {
  const [footerColor, setFooterColor] = useState();
  const [bodyColor, setBodyColor] = useState();
  const { user } = useUser();
  const { id } = useParams();

  useEffect(() => {
    function getRandomColorPair() {
      const hue = Math.floor(Math.random() * 360);

      const saturation = 70;
      const lightnessLight = 85;
      const lightnessDark = 45;

      const lightColor = `hsl(${hue}, ${saturation}%, ${lightnessLight}%)`;
      const darkColor = `hsl(${hue}, ${saturation}%, ${lightnessDark}%)`;

      return { lightColor, darkColor };
    }

    const cardColors = getRandomColorPair();
    setFooterColor(cardColors.darkColor);
    setBodyColor(cardColors.lightColor);
  }, []);

  const priorityTagColor = {
    High: 'text-red-500 font-semibold',
    Low: 'text-green-500 font-semibold',
    Medium: 'text-blue-500 font-semibold',
  };

  const handleDeleteCard = async () => {
    try {
      await deleteDoc(doc(db, 'workspaceDocument', document.id));
      location.reload();
    } catch (error) {
      console.log('Error in handle delete function :: ', error.message);
    }
  };

  const getUploadedFileName = () => {};
  return (
    <div className="w-[300px]  rounded-lg shadow-md bg-white overflow-hidden flex flex-col justify-between">
      {/* Header Section */}
      <div className="flex items-center p-5 border-b">
        <img
          src={user?.imageUrl} // Replace with the path to your profile image
          alt={user?.fullName}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{user?.fullName}</h2>
          <p className={priorityTagColor[document.priority]}>
            Priority: {document?.priority}
          </p>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="p-5">
        <h3 className="text-md font-bold">{document.title}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-gray-700 h-[70px] overflow-ellipsis overflow-hidden text-left ">
                {document?.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="ml-5">
              <p className="w-[700px] h-[300px] overflow-auto p-5 text-left">
                {document?.description}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-between p-5 ">
        <div className="flex flex-col">
          <p className="text-sm">CreatedOn:</p>
          <span className="text-gray-500 text-sm">{document?.createdOn}</span>
        </div>
        <div className=""></div>
      </div>
      
      {/* Footer Section */}
      <div
        className="flex justify-between items-center p-4 border-t "
        style={{ backgroundColor: bodyColor }}
      >
        <div className="flex gap-5 justify-between w-full">
          {document.downloadURL ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a href={document.downloadURL} target="_blank">
                    <FaLink />{' '}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{document.uploadedfileName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <h1>No file Uploaded</h1>
          )}

          <div className="flex gap-2 items-center">
            <Link to={`/workspace/${id}/create-document`}>
              <FaEdit />
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MdDeleteForever
                    onClick={handleDeleteCard}
                    className="text-lg"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>

    // </motion.div>
  );
};

export default Card;
