import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (olddata, e) => {
    const data={
      ...olddata,
      role: "Patient"
    }
    console.log(data);

    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/user/patient/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      // console.log(response);
      if (response.ok) {
        const message = await response.json();
        
        toast.success(message.message)
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      }
      else {
        const errormessage = await response.json();
        const mess = errormessage.message
        const isAarry= await Array.isArray(mess);
          if(isAarry){
            for(let i=0;i<mess.length;i++){
              toast.error(mess[i]);
            }
          }
          else{
            toast.error(mess)
          }

        
      }

    } catch (error) {
      console.log("Error", error);
    }


  };

  if (errors.password) {
    toast.error(errors.password.message);
  }

  return (
    <div className="container form-component register-form">
      <h2 className="mt-8">Sign Up</h2>
      <p>Please Sign Up To Continue</p>
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
          <select {...register("gender")} >
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
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" className="btn1">Register</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp