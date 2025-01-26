import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexApi/AuthContex";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Dashborad = () => {

  const { userData, token, loading, isverify,doctorData } = useContext(AuthContext);


  
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


  const [appointments, setAppointments] = useState([]);


  const handleUpdateStatus = async (appointmentId, status) => {

    try {
      const response = await fetch(`${apiUrl}/api/user/appointment/update/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status }) 
      });
  
      
      
      if (response.ok) {
        const message = await response.json();
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: status } // Update the status of the specific appointment
              : appointment // Keep other appointments unchanged
          )
        );      } else {
        const errmessage = await response.json();
        console.log(errmessage); 
      }
  
    } catch (error) {
      console.log('Error occurred:', error);
    }
  }
  



  const fetchingmessage = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/appointment/getall`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });



      if (response.ok) {
        const data = await response.json();
        // console.log(data.allappointment)
        setAppointments(data.allappointment)
        
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
  },[]);



  return (
    <>
      <section className="dashboard1 page1">
        <div className="banner1">
          <div className="firstBox">
            <img src="/doctor/doc.png" alt="docImg" />
            <div className="content1">
              <div className="ml-3">
                <p>Hello ,</p>
                <h5>
                  {userData &&
                    `${userData.firstName || ""} ${userData.lastName || ""}`}{" "}
                </h5>
              </div >
              <p className="ml-3">
                The dashboard page in a doctor website provides an overview of patient appointments, medical history and performance analytics, enabling efficient healthcare management.
              </p>
            </div>
          </div>
          <div className="secondBox1">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox1">
            <p>Registered Doctors</p>
            <h3>{doctorData.length}</h3>
          </div>
        </div>

        <div className="banner1">
  <h5>Appointments</h5>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right  ">

  <thead className="text-xs uppercase  ">

                <tr>
                <th scope="col" className="px-6  py-3">
                Patient
                </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                Doctor
                </th>
                <th scope="col" className="px-6 py-3">
                Department
                </th>
                <th scope="col" className="px-6 py-3">
                Status
                </th>
                <th scope="col" className="px-6 py-3">
                Visited
                </th>
            </tr>


            {appointments.length > 0
                ? appointments.map((appointment) => (
                  <tr key={appointment._id} className="   border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td className="px-6 py-4">{appointment.appointment_date.substring(0, 16)}</td>
                    <td className="px-6 py-4">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td className="px-6 py-4">{appointment.department}</td>
                    <td>
                    <select
                        className={`mr-32
                          ${appointment.status === "Pending"
                            ? "value-pending1"
                            : appointment.status === "Accepted"
                              ? "value-accepted1 "
                              : "value-rejected1"}

                              `
                        }
                        value={appointment.status}
                        onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                      >
                        <option value="Pending" className="value-pending1">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted1">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected1">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td className="pl-9 pr-10">{appointment.hasVisited === true ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}</td>
                  </tr>
                ))
                : "No Appointments Found!"}
     
  </thead>
  </table>


  </div>
</div>



      </section>
    </>

  )
}

export default Dashborad