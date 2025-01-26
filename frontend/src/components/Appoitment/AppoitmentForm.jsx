
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../contexApi/AuthContex";

const AppoitmentForm = () => {

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { token,isverify } = useContext(AuthContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
   

    const [department1, setDepartment1] = useState();

   
      const {doctorData}= useContext(AuthContext)

    //   console.log(doctorData);
      const [loading, setLoading] = useState(false);




    const onSubmit = async (olddata) => {

        const [firstName, lastName] = olddata.fullName.split(" ");
        setLoading(true)
        const data = {
            ...olddata,
            doctor_firstName: firstName,
            doctor_lastName: lastName,
        };


        try {
            const response = await fetch(`${apiUrl}/api/user/appointment/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const message = await response.json();
                toast.success(message.message);
                console.log(message.message);
                reset();
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                const errormessage = await response.json();
                const mess = errormessage.message;

                if (Array.isArray(mess)) {
                    mess.forEach((error) => toast.error(error));
                } else {
                    toast.error(mess);
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
        <>
            <div className="container form-component appointment-form">
                <h2>Appointment</h2>
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

                    < div>
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
                            type="date"
                            placeholder="Date of Birth"

                            {...register("dob")}

                        />
                    </div>

                    <div>
                        <select {...register("gender")}     >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input
                            type="date"
                            placeholder="Appointment Date"
                            {...register("appointment_date")}
                        />
                    </div>

                    <div>

                        <select
                            {...register("department")}
                            value={department1}
                            onChange={(e) => { setDepartment1(e.target.value) }}

                        >
                            <option value="">Select Department</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Radiology">Radiology</option>
                            <option value="Physical Therapy">Physical Therapy</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="ENT">ENT</option>
                        </select>

                        <select
                            disabled={!department1}
                            {...register("fullName")}
                        >

                            <option value="">Select Doctor</option>
                            {doctorData
                                .filter((doctor) => doctor.doctorDepartment === department1)
                                .map((doctor, index) => (
                                    <option

                                        key={index}
                                    >
                                        {doctor.firstName} {doctor.lastName}
                                    </option>
                                ))}

                        </select>

                        {/* <select
                            value={`${doctorFirstName} ${doctorLastName}`}
                            onChange={(e) => {
                                const [firstName, lastName] = e.target.value.split(" ");
                                setDoctorFirstName(firstName);
                                setDoctorLastName(lastName);
                            }}
                            disabled={!department}
                        >
                            <option value="">Select Doctor</option>
                            {doctors
                                .filter((doctor) => doctor.doctorDepartment === department)
                                .map((doctor, index) => (
                                    <option
                                        value={`${doctor.firstName} ${doctor.lastName}`}
                                        key={index}
                                    >
                                        {doctor.firstName} {doctor.lastName}
                                    </option>
                                ))}
                        </select> */}
                    </div>

                    <textarea
                        className="resize-none"
                        rows="7"
                        {...register("address")}
                        placeholder="Address"
                    />


                    <div
                        style={{
                            gap: "10px",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                        }}
                    >
                        <p style={{ marginBottom: 0 }}>Have you visited before?</p>
                        <input
                            type="checkbox"
                            {...register('hasVisited')}

                            style={{ flex: "none", width: "25px" }}
                        />
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
                                    <button type="submit" className="btn1">Send</button>
                                )
                        }
                     
                    </div>
                </form>
            </div>
        </>
    )
}

export default AppoitmentForm