import { Outlet } from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 

  return (
    <>
    <Navbar />
    <Outlet />
    <ToastContainer 
    autoClose={3000}/>
    <Footer />
    </>
  )
}

export default App
