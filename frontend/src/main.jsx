import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Appointment from './pages/Appointment.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import {AuthProvider}  from './contexApi/AuthContex.jsx'
import Admin from './Admin.jsx'
import AddNewDoctor from './components/Admin/AddNewDoctor.jsx'
import AddnewAdmin from './components/Admin/AddnewAdmin.jsx'
import Dashborad from './components/Admin/Dashborad.jsx'
import Doctors from './components/Admin/Doctors.jsx'
import Message from './components/Admin/Message.jsx'
import ProtectRoutes from './components/Admin/ProtectRoutes.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/aboutus',
        element: <AboutUs />,
      },
      {
        path: '/appointment',
        element: <Appointment />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },

    ],
  },
  {
    path: '/admin',
    element:<ProtectRoutes><Admin /></ProtectRoutes>,
    children: [
      {
        path: '/admin',
       element: <ProtectRoutes><Dashborad/></ProtectRoutes>
      },
      {
        path: '/admin/add/admin',
       element: <ProtectRoutes><AddnewAdmin/></ProtectRoutes>
      },
      {
        path: '/admin/add/doctor',
       element: <ProtectRoutes><AddNewDoctor/></ProtectRoutes>
      },
      {
        path: '/admin/doctors',
       element: <ProtectRoutes><Doctors/></ProtectRoutes>
      },
      {
        path: '/admin/message',
       element: <ProtectRoutes><Message/></ProtectRoutes>
      },
      
      
    ],
  },

]);




createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
)
