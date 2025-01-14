import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/Admin/SideBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css'

const admin = () => {
  return (
   <>
     <div className='bg-indigo-800 h-screen'>
     <SideBar />
     <Outlet />
     <ToastContainer 
    autoClose={3000}/>
     </div>
   </>
  )
}

export default admin