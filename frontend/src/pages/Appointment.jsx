import React, { useContext, useEffect, useState } from 'react'
import AppoitmentHero from '../components/Appoitment/AppoitmentHero'
import AppoitmentBiography from '../components/Appoitment/AppoitmentBiography'
import AppoitmentForm from '../components/Appoitment/AppoitmentForm'
import { AuthContext } from '../contexApi/AuthContex'
import { useNavigate } from 'react-router-dom'

const Appointment = () => {

  const {isverify} = useContext(AuthContext);
  const navigate= useNavigate();


   const [token, setToken] = useState(localStorage.getItem("token"));
  
  
    useEffect(() => {
      if (!token) {
        navigate('/login')
      }
  
    }, []);
  
   
  
  return (
  <>
  <AppoitmentHero />
  <AppoitmentBiography />
  <AppoitmentForm />
  </>
  )
}

export default Appointment