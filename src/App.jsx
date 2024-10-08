import { useState } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Foreground from './components/Foreground';

function App() {
  return (
    <div className="w-full h-screen  ">
      <Navbar/>
     <Background/>
      <Foreground /> 
    </div>
  );
}

export default App;
