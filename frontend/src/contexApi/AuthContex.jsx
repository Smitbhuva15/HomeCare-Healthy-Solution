import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState({});


    let isverify=!!token;
    console.log(isverify);
   

    const fetchUserData = async () => {
    //   console.log(token)

        try {
            const response = await fetch('http://localhost:5000/api/user/auth', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })
            if (response.ok) {
            const message = await response.json();
            console.log(message)
            setUserData(message)
            }
            else {
                const errormessage = await response.json();
                console.log(errormessage)
              

            }


        } catch (error) {
            console.log("Error", error);
        }
    }

   useEffect(() => {
    
    fetchUserData() 
   }, [token]);

   const logout=()=>{
    setToken("");
    window.location.reload(true);
    return localStorage.removeItem("token");
   }


    return (
        <AuthContext.Provider value={{userData,token,logout,isverify}}>
            {children}
        </AuthContext.Provider>
    );
};