import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexApi/AuthContex';


const AddnewAdmin = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { userData, token, loading,isverify } = useContext(AuthContext)
  // console.log(userData.role, "user")

   

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
    navigate("/");
  }

  if (userData.role !== "Admin") {

    return (
      <div className='container1 w-2/3 mx-auto flex items-center justify-center min-h-screen rounded-3xl my-20 bg-white text-indigo-600'>
        <h1 >Only Admin Is Access This Feature!!</h1>
      </div>
    )
  }




  const onSubmit = async (data, e) => {

    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admin/addadmin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(data)
      })

      console.log(response);
      if (response.ok) {
        const message = await response.json();
        console.log(message);
        toast.success(message.message)
        reset();
        setTimeout(() => {
          navigate("/admin");
        }, 2000);

      }
      else {
        const errormessage = await response.json();
        const mess = errormessage.message
        console.log(mess);
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

  }


  if (errors.password) {
    toast.error(errors.password.message);
  }


  return (


    <div className="container form-component register-form bg-white rounded-3xl">
      <div className='flex justify-center'>
        <img src="/logo.png" alt="logo" className="w-52  " />
      </div>
      <h1 className="form-title1">ADD NEW ADMIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}



          />
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}


          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email")}

          />
          <input
            type="number"
            placeholder="Mobile Number"
            {...register("phone")}

          />
        </div>
        <div>
          <input
            type="number"
            placeholder="NIC"
            {...register("nic")}

          />
          <input
            type={"date"}
            placeholder="Date of Birth"
            {...register("dob")}

          />
        </div>
        <div>
          <select  {...register("gender")} >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}


          />

        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" className="btn1">ADD NEW DOCTOR</button>
        </div>
      </form>
    </div>


  )
}

export default AddnewAdmin