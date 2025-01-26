import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexApi/AuthContex'
import { Link, useNavigate } from 'react-router-dom'


const ProtectRoutes = ({children}) => {
 
  const {userData,loading}=useContext(AuthContext)
  const navigate=useNavigate()
 
  useEffect(() => {
    // if(loading) return
    
     if(userData===null || userData.role!=="Admin"){
         navigate('/')
         
     }
    
  }, []);
 
 
   return (
     <>
     {children}
     </>
   )
}

export default ProtectRoutes