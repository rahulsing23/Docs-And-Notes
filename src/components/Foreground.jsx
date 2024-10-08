import React from 'react';
import Card from './Card';
import { useRef } from 'react';
const Foreground = () => {
  const ref = useRef(null);

  return (
    <div>
        
      <div ref={ref} className="w-full h-screen ml-5  top-0 left-0 z-[3]">
        <div className="grid grid-cols-5 gap-5 mt-10">
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
        </div>
      </div>
    </div>
  );
};

export default Foreground;
