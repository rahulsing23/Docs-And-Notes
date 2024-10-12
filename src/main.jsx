import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layout/root-layout'
import DashboardLayout from './layout/dashboard-layout'
import CreateWorkspace from './pages/CreateWorkspace'
import WorkspacePage from "./pages/WorkspacePage"
// Import the components


import SignInPage from './pages/Sign-In'
import SignUpPage from './pages/Sign-up'
import DashboardPage from './pages/Dashboard'
import CreateNewDocument from './pages/CreateNewDocument'


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [

 
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/createworkspace', element: <CreateWorkspace /> },
          { path: '/workspace/:id', element: <WorkspacePage /> },
          { path: '/workspace/:id/create-document', element: <CreateNewDocument /> },

        ],
      },
    
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)