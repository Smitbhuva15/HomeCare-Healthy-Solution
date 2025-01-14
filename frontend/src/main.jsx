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
    element: <Admin />,
    children: [
      {
        path: '/admin',
       element: <Dashborad/>
      },
      {
        path: '/admin/add/admin',
       element: <AddnewAdmin/>
      },
      {
        path: '/admin/add/doctor',
       element: <AddNewDoctor/>
      },
      {
        path: '/admin/doctors',
       element: <Doctors/>
      },
      {
        path: '/admin/message',
       element: <Message/>
      },
      
      
    ],
  },

]);




createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
)
