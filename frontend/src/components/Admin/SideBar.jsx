import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import '../../Admin.css'
import { AuthContext } from "../../contexApi/AuthContex";



const SideBar = () => {

  const [show, setShow] = useState(false);
  const navigate=useNavigate();

  const {logout}=useContext(AuthContext)

  const gotoHomePage = () => {
    navigate("/admin");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigate("/admin/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigate("/admin/message");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigate("/admin/add/doctor");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigate("/admin/add/admin");
    setShow(!show);
  };

  const handleLogout=()=>{
    navigate("/");
    logout();
    setShow(!show);


  }


  return (
    <>


      <nav
        className={show ? "show1 sidebar1" : "sidebar1"  }
      >

        <div className="links1">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>

      </nav>
      <div
        className="wrapper1"
        
      >
        <GiHamburgerMenu className="hamburger1" onClick={() => setShow(!show)} />
      </div>
     
    </>
  )
}

export default SideBar