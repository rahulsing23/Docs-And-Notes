import React from 'react';
import HeroSectionCard from './HeroSectionCard';

const Background = () => {
  return (
    <div>
      <div className="fixed z-[-2] w-full h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-[210%] -translate-y-[60%]">
            <HeroSectionCard/>
        </div>
        <h1 className="absolute top-1/2 left-1/2 
        text-[13vw] -translate-x-[50%] -translate-y-[70%] leading-none tracking-tight
         text-zinc-300 ">
          Notes.
        </h1>
      </div>
    </div>
  );
};

export default Background;
