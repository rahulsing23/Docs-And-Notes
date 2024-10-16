import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layout/root-layout'
import DashboardLayout from './layout/dashboard-layout'
import WorkSpaceLayout from './layout/workspaceLayout'
// Import the components


import SignInPage from './pages/Sign-In'
import SignUpPage from './pages/Sign-up'
import DashboardPage from './pages/Dashboard'
import CreateNewDocument from './pages/CreateNewDocument'
import CreateWorkspace from './pages/CreateWorkspace'
import WorkspacePage from "./pages/WorkspacePage"
import EditDocument from './pages/EditDocument'


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
          { path: '/workspace/:id', element: (<WorkSpaceLayout><WorkspacePage /></WorkSpaceLayout>) },
          { path: '/workspace/:id/create-document', element: <CreateNewDocument /> },
          { path: '/workspace/:id/:docId/edit-document', element: <EditDocument /> },

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