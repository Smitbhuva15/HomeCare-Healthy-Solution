import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
     const [doctorData, setDoctorData] = useState([]);

    let isverify=!!token;
    // console.log(isverify);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const logout=()=>{
        setToken("");
        localStorage.removeItem("token");
        window.location.reload(true)
       }

    const fetchUserData = async () => {
    //   console.log(token)
         setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/user/auth`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })
            if (response.ok) {
            const message = await response.json();
            setUserData(message)
           console.log(message)
            setLoading(false);
            }
            else {
                const errormessage = await response.json();
                console.log(errormessage)
              

            }


        } catch (error) {
            console.log("Error", error);
        }
    }



     const fechingDoctorData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/user/getdatadoctor`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                      },
    
                })
    
                if (response.ok) {
                    const data = await response.json();
    
                    setDoctorData(data.doctorData);
                    
                }
                else {
                    const error = await response.json();
                    console.log(error);
    
                }
    
    
            } catch (error) {
                console.log("doctor data feching error", error)
            }
        }

   useEffect(() => {
    
    fetchUserData() 
    fechingDoctorData();
   }, [token]);

  


    return (
        <AuthContext.Provider value={{userData,token,isverify,doctorData,logout ,loading,setToken,fechingDoctorData,fetchUserData}}>
            {children}
        </AuthContext.Provider>
    );
};
