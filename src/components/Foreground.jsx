import React from 'react';
import Card from './Card';
import { useRef } from 'react';
import { Button } from './ui/button';
const Foreground = () => {
  const ref = useRef(null);

  return (
    <div className='w-full h-screen p-5'>
      <div className="w-full h-[80px]  flex justify-end items-center">
        <Button className="bg-rose-600 rounded-lg h-[50px] w-[150px]">+New Notes</Button>
      </div>
      <div ref={ref} className="w-full h-screen  top-0 left-0 z-[3] p-5">
        <div className="grid grid-cols-5 gap-5 mt-10">
          <Card reference={ref} />
        </div>
      </div>
    </div>
  );
};

export default Foreground;
