import React, { useContext } from 'react'
import AppoitmentHero from '../components/Appoitment/AppoitmentHero'
import AppoitmentBiography from '../components/Appoitment/AppoitmentBiography'
import AppoitmentForm from '../components/Appoitment/AppoitmentForm'
import { AuthContext } from '../contexApi/AuthContex'
import { useNavigate } from 'react-router-dom'

const Appointment = () => {

  const {isverify} = useContext(AuthContext);
  const navigate= useNavigate();


  
   
  
  return (
  <>
  <AppoitmentHero />
  <AppoitmentBiography />
  <AppoitmentForm />
  </>
  )
}

export default Appointment