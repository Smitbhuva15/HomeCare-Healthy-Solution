import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../contexApi/AuthContex";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { userData, setToken } = useContext(AuthContext)
    const [token1, setToken1] = useState(localStorage.getItem("token"));
        const [loading, setLoading] = useState(false);
    

    // const apiUrl = process.env.REACT_APP_BACKEND_URL;

    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (token1) {
            navigate('/')
        }

    }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault()

  setLoading(true)

        try {
            const response = await fetch(`${apiUrl}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })


            if (response.ok) {
                const message = await response.json();
                setToken(message.patient_token)
                localStorage.setItem("token", message.patient_token)
                toast.success(message.message)
                reset();
                setTimeout(() => {

                    if (message.userdata.role === "Admin") {
                        navigate("/admin");
                    }
                    else {
                        navigate('/')
                    }

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
        finally{
            setLoading(false)
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
                    {/* <input
                        type="text"
                        placeholder="Role Of User"
                        name="role"
                        {...register("role")}

                    /> */}
                    <select {...register("role")}>
                        <option value="Select Role"  >Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Patient">Patient</option>

                    </select>
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
                                    <button type="submit" className="btn1">Login</button>
                                )
                        }

                    </div>
                </form>

            </div>

        </>
    )
}

export default Login