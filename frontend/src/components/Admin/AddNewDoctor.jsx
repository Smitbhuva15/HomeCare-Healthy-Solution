import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexApi/AuthContex';

const AddNewDoctor = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { userData, token, loading, isverify } = useContext(AuthContext)

  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [loading1, setLoading1] = useState(false);


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
  //     navigate("/");
  //   }

  //   if (userData.role !== "Admin") {

  //     return (
  //       <div className='container1 w-2/3 mx-auto flex items-center justify-center min-h-screen rounded-3xl my-20 bg-white text-indigo-600'>
  //         <h1 >Only Admin Is Access This Feature!!</h1>
  //       </div>
  //     )
  //   }


  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };

  }

  const onSubmit = async (data, e) => {
    // console.log(data);
    e.preventDefault();
    setLoading1(true)

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("nic", data.nic);
      formData.append("dob", data.dob);
      formData.append("gender", data.gender);
      formData.append("doctorDepartment", data.doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const response = await fetch(`${apiUrl}/api/admin/new/doctor`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });


      if (response.ok) {
        const message = await response.json();
        console.log(message);
        toast.success(message.message);
        reset();
        console.log(formData);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        const errormessage = await response.json();
        const mess = errormessage.message;
        console.log(mess);

        const isArray = Array.isArray(mess);
        if (isArray) {
          for (let i = 0; i < mess.length; i++) {
            toast.error(mess[i]);
          }
        } else {
          toast.error(mess);
        }
      }



    } catch (error) {
      console.log("Error", error);
      toast.error("Network or server error occurred.");
    }
    finally {
      setLoading1(false)
    }



  }



  if (errors.password) {
    toast.error(errors.password.message);
  }

  return (

    <section className="page1 bg-indigo-800">
      <section className="container1 add-doctor-form1">
        <img src="/logo.png" alt="logo" className="logo1 w-52" />
        <h1 className="form-title1">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="first-wrapper1">
            <div>
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/doctor/docHolder.jpg"
                }
                alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>

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
              <select

                {...register("gender")}
              >
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
              <select
                {...register("doctorDepartment")}
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
              {
                loading1 ?
                  (
                    <button type="submit" className="btn1 w-40 h-14 bg-blue-500 text-white rounded flex items-center justify-center">
                      <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                      <span className="ml-2">Please wait</span>
                    </button>

                  )
                  :
                  (
                    <button type="submit" className='btn1'>Register New Doctor</button>

                  )
              }


            </div>


          </div>
        </form>
      </section>
    </section>

  )
}

export default AddNewDoctor