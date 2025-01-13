import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from '../contexApi/AuthContex';


const Navbar = () => {

  const { userData, isverify, logout } = useContext(AuthContext);
 
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <nav className="container -mt-10">
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" onClick={() => navigate('/')} />

        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/aboutus"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {
            isverify ?
              (
                <button className="loginBtn btn " onClick={()=>{
                  logout()
                 setShow(!show)
                 
                  }}>
                  LOG OUT
                </button>
              )
              :
              (
                <button className="loginBtn btn" 
                onClick={() => { 
                navigate('/login') 
                setShow(!show)
                }}>
                  LOGIN
                </button>
              )

          }

        </div>

        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>

      </nav>
    </>
  )
}

export default Navbar