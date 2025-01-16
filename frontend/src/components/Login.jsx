import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";

import { Link, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../contexApi/AuthContex";

const Login = () => {
    const navigate=useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
     const {userData}= useContext(AuthContext)

    const onSubmit = async (data,e) => {
        e.preventDefault()
       
        try {
            const response = await fetch('https://homecare-healthy-solution.onrender.com/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            
            if (response.ok) {
                const message = await response.json();
                localStorage.setItem("token",message.patient_token)
                toast.success(message.message)
                reset();
                setTimeout(() => {
                    navigate("/");
                    window.location.reload(true);
                }, 2000);
               
            }
            else {
                const errormessage = await response.json();
                // console.log(errormessage.message);
                toast.error(errormessage.message)

            }

        } catch (error) {
            console.log("Error", error);
            toast.error("Network or server error occurred.");
        }

       

        
    };

    return (
        <>
            <div className="container form-component login-form ">
                <h2 className="mt-8">Login In</h2>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        {...register("email")}

                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...register("password")}

                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        {...register("confirmPassword")}

                    />
                    <input
                        type="text"
                        placeholder="Role Of User"
                        name="role"
                        {...register("role")}

                    />
                    <div
                        style={{
                            gap: "10px",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                        }}
                    >
                        <p style={{ marginBottom: 0 }}>Not Registered?</p>
                        <Link
                            to={"/signup"}
                            style={{ textDecoration: "none", color: "#271776ca" }}
                        >
                            Register Now
                        </Link>
                    </div>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit" className="btn1">Login</button>
                    </div>
                </form>
               
            </div>

        </>
    )
}

export default Login