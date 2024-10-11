import React, { useEffect, useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { motion } from "framer-motion"
import Background from './Background';



const Card = ({reference}) => {
    const [footerColor, setFooterColor] = useState();
    const [bodyColor, setBodyColor] = useState();
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
          console.log(cardColors);
          setFooterColor(cardColors.darkColor)
          setBodyColor(cardColors.lightColor)
    }, []);

   
  
    
      
  return (
    <motion.div drag dragConstraints={reference}  whileDrag={{scale:1.1}} dragMomentum={false}  className="w-60 h-72 rounded-[30px] relative overflow-hidden" style={{backgroundColor: bodyColor}}>
      <div className=" p-5">
        <FaRegFileAlt />
        <p className="text-sm mt-5 font-medium leading-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
          eum unde. Reprehenderit doloremque provident vel!
        </p>
      </div>

      <div className="w-full footer absolute bottom-0  h-10 left-0 py-3" style={{backgroundColor: footerColor}}>
        <div className="">
            <h5></h5>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
