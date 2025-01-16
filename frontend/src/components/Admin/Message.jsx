import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexApi/AuthContex";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Message = () => {

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


  
  if (userData.role !== "Admin") {

    return (
      <div className='container1 w-2/3 mx-auto flex items-center justify-center min-h-screen rounded-3xl my-20 bg-white text-indigo-600'>
        <h1 >Only Admin Is Access This Feature!!</h1>
      </div>
    )
  }



  const [message, setMessage] = useState([]);

  const fetchingmessage = async () => {
    try {
      const response = await fetch("https://homecare-healthy-solution.onrender.com/api/message/get/all/message", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });



      if (response.ok) {
        const data = await response.json();
        // console.log(data.allmessage)
        setMessage(data.allmessage)
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
      {
        <section className="page1 messages1">
          <h1 className="mt-10" >MESSAGE</h1>
          <div className="banner1">
            {
              message.length > 0
                ?
                (
                  message.map((item, index) => (
                    <div className="card1" key={index}>
                      <div className="details1">
                        <p>
                          First Name: <span>{item.firstName}</span>
                        </p>
                        <p>
                          Last Name: <span>{item.lastName}</span>
                        </p>
                        <p>
                          Email: <span>{item.email}</span>
                        </p>
                        <p>
                          Phone: <span>{item.phone}</span>
                        </p>
                        <p>
                          Message: <span>{item.message}</span>
                        </p>
                      </div>

                    </div>
                  ))

                )
                :
                (
                  <h1>No Messages!</h1>
                )
            }


          </div>

        </section>
      }

    </>
  )
}

export default Message