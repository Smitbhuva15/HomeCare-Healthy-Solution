import React, { useContext } from 'react'
import { AuthContext } from '../../contexApi/AuthContex';

const Hero = () => {
  const { userData, isverify, logout } = useContext(AuthContext);
  // fetchUserData();
  const username=userData.firstName||"To";
  return (

    <>
      <div className="hero container mt-10">
        <div className="banner">
          <h1>{`Welcome  ${username}, HomeCare Healthy Solution | Your Trusted Healthcare Provider`}</h1>
          <p>
            HomeCare Healthy Solution is a modern healthcare facility focused on delivering exceptional care with empathy and expertise. Our dedicated team of professionals offers personalized services designed to meet each patient’s unique needs. At HomeCare, your health is our priority, ensuring a supportive and effective path to wellness.
          </p>
        </div>
        <div className="banner">
          <img src="/heroImage.jpg" alt="Hero"  className="animated-image"/>
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>

      </div>
    </>
  )
}

export default Hero