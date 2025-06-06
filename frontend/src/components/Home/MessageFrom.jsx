import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageForm = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const onSubmit = async (data, e) => {
    setLoading(true)
    e.preventDefault()
    console.log("Form data:", data);
    try {
      const response = await fetch(`${apiUrl}/api/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      console.log(response);
      if (response.ok) {
        const message = await response.json();
        toast.success(message.message)
        reset();


      }
      else {
        const errormessage = await response.json();
        const mess = errormessage.message
        const isAarry = await Array.isArray(mess);
        if (isAarry) {
          for (let i = 0; i < mess.length; i++) {
            toast.error(mess[i]);
          }
        }
        else {
          toast.error(mess)
        }




      }

    } catch (error) {
      console.log("Error", error);
    }
    finally{
      setLoading(false)
    }

  };



  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input
            type="text"
            placeholder="First Name"
            name='firstName'
            {...register("firstName")}
          />
          <input
            type="text"
            placeholder="Last Name"
            name='lastName'
            {...register("lastName")}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            name='email'
            {...register("email")}
          />
          <input
            type="number"
            placeholder="Mobile Number"
            name='phone'
            {...register("phone")}
          />
        </div>

        <textarea
          rows={7}
          placeholder="Message"
          name='message'
          {...register("message")}
        />

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          {
            loading?
            (
              <button type="submit" className="btn1 w-40 h-14 bg-blue-500 text-white rounded flex items-center justify-center">
              <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="ml-2">Please wait</span>
            </button>
            
            )
            :
            (
              <button type="submit" className='btn1'>Send</button>
            )
          }
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
