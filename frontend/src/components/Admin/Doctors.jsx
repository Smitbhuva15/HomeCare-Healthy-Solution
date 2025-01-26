import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexApi/AuthContex";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Doctors = () => {

  const { userData, token, loading, isverify } = useContext(AuthContext)
 
    
  if (loading) {
    return (
<div class="flex items-center justify-center min-h-screen">
  <div class="w-24 h-24 border-8 border-t-8 border-transparent rounded-full animate-spin relative">
    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 animate-spin-slow"></div>
  </div>
</div>  
    )
  }


  
//   if (userData.role !== "Admin") {

//     return (
//       <div className='container1 w-2/3 mx-auto flex items-center justify-center min-h-screen rounded-3xl my-20 bg-white text-indigo-600'>
//         <h1 >Only Admin Is Access This Feature!!</h1>
//       </div>
//     )
//   }

  


const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [docdata, setDocData] = useState([]);



  const fetchingmessage = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/getdatadoctor`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      //  console.log(response)

      if (response.ok) {
        const data = await response.json();
        // console.log(data.doctorData)
        setDocData(data.doctorData)
      } else {
        const errormessage = await response.json();

        toast.info(errormessage.message)
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Network or server error occurred.");
    }
  };

  useEffect(() => {
    fetchingmessage();
  }, []);



  return (
    <>
      <section className="page1 doctors1">
        <h1>DOCTORS</h1>
        <div className="banner1">
          {docdata.length > 0 ? (
            docdata.map((element) =>
            (
              <div className="card1">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details1">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            )
            )
          ) : (
            <h1>No Registered Doctors Found!</h1>
          )}
        </div>


      </section>

    </>
  )
}

export default Doctors