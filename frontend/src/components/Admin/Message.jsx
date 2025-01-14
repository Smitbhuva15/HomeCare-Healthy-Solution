import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexApi/AuthContex";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Message = () => {

  const { token } = useContext(AuthContext);

  const [message, setMessage] = useState([]);



  const fetchingmessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/message/get/all/message", {
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