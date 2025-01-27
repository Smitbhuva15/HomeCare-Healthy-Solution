import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [token, setToken] = useState(localStorage.getItem("token"));
      const [loading, setLoading] = useState(false);
  

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (token) {
      navigate('/')
    }

  }, []);

  const onSubmit = async (olddata, e) => {
    const data = {
      ...olddata,
      role: "Patient"
    }
    console.log(data);
    setLoading(true)
    e.preventDefault()

    try {
      const response = await fetch(`${apiUrl}/api/user/patient/register`, {
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
      toast.error("Network or server error occurred.");
    }
    finally{
      setLoading(false)
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
            placeholder="Aadhar Card Number"
            {...register("aadhar")}

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
        {
                            loading ?
                                (
                                    <button type="submit" className="btn1 w-40 h-14 bg-blue-500 text-white rounded flex items-center justify-center">
                                        <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                                        <span className="ml-2">Please wait</span>
                                    </button>

                                )
                                :
                                (
                                  <button type="submit" className="btn1">Register</button>
                                )
                        }
          
        </div>
      </form>
    </div>
  )
}

export default SignUp