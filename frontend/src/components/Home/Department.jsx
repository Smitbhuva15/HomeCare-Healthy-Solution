import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const para='Our hospital offers a wide range of specialized departments to provide comprehensive care for all patients. From Pediatrics to Cardiology, Orthopedics to Neurology, each department is staffed with highly trained professionals dedicated to delivering personalized treatment. With advanced medical technology and compassionate care, we ensure the highest standards of health and wellness for every patient.'

const Departments = () => {
  const departmentsArray = [


    {      
      name: "psychiatrist",
      imageUrl: "/department/mind-image.jpg",
    },
    
    {
      name: "Radiology",
      imageUrl: "/department/radio.jpg",
    },

    

    {
      name: "Neurology",
      imageUrl: "/department/neuro.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/department/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/department/heart.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/department/ear-image.jpg",
    },
   
    {
      name: "Oncology",
      imageUrl: "/department/onco2.jpg",
    },
    
    {
      name: "Physical Therapy",
      imageUrl: "/department/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/department/derma.jpg",
    },
   


    
  ];

  

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 3,
      slidesToSlide: 1, 
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 2,
      slidesToSlide: 1, 
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, 
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <p className="mb-5">{para}</p>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
