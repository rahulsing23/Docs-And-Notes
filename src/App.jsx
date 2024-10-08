import { useState } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Foreground from './components/Foreground';
import SignInPage from './pages/Sign-In';
import SignUpPage from './pages/Sign-up';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import DashboardLayout from './layout/dashboard-layout';
function App() {
  return (
    <BrowserRouter className="w-full h-screen  ">
      
      <Routes>
        
      </Routes>

    

    </BrowserRouter>
  );
}

export default App;
