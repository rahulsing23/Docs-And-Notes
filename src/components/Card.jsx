import React, { useEffect, useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { motion } from "framer-motion"
import Background from './Background';
import { useUser } from '@clerk/clerk-react';


const Card = ({reference, doc}) => {
    const [footerColor, setFooterColor] = useState();
    const [bodyColor, setBodyColor] = useState();
    const {user} = useUser()
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
          setFooterColor(cardColors.darkColor)
          setBodyColor(cardColors.lightColor)
    }, []);

   
  
    
      
  return (
    // <motion.div drag dragConstraints={reference}  whileDrag={{scale:1.1}} dragMomentum={false}  className="w-60 h-72 rounded-[30px] relative overflow-hidden" style={{backgroundColor: bodyColor}}>
    <motion.div drag dragConstraints={reference} whileDrag={{scale:1.1}} dragMomentum={false}  className="w-[300px] rounded-lg shadow-md bg-white overflow-hidden p-4">
      {/* Header Section */}
      <div className="flex items-center p-4 border-b">
        <img
          src={user?.imageUrl} // Replace with the path to your profile image
          alt={user?.fullName}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{user?.fullName}</h2>
          <p className="text-sm text-gray-500">IT Staff</p>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="p-4">
        <h3 className="text-md font-bold">{doc.title}</h3>
        <p className="text-gray-700 h-32 overflow-y-auto ">
          {doc?.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
          <span className="text-gray-500">{doc?.createdOn}</span>
          <span className="text-red-500 font-semibold">{doc?.priority}</span>
      </div>
      {/* Footer Section */}
      <div className="flex justify-between items-center p-4 border-t">
        
      </div>
    </motion.div>
  
    // </motion.div>
  );
};

export default Card;
