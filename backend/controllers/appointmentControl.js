const { appointmentmodel } = require("../module/appointmentSchema");
const { userModel } = require("../module/userSchema");



exports.sendappointment=async(req,res)=>{
    
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            aadhar,
            dob,
            gender,
            appointment_date,
            department,
            doctor_firstName,
            doctor_lastName,
            hasVisited,
            address,
        }=req.body;
      

        if (
          !firstName ||
          !lastName ||
          !email ||
          !phone ||
          !aadhar ||
          !dob ||
          !gender ||
          !appointment_date ||
          !department ||
          !doctor_firstName ||
          !doctor_lastName ||
          !address 
          
        ) {
          return res.status(400).json({message : "Please Fill Full Form !!"})
        }
    
         const isConflict = await userModel.find({
            firstName: doctor_firstName,
            lastName: doctor_lastName,
            role: "Doctor",
            doctorDepartment: department,
          });
          if (isConflict.length === 0) {
            return res.status(500).json({message : "Doctor Is Not Exist !!"})
          }
          if (isConflict.length > 1) {
            return res.status(500).json({message : "Doctors Conflict! Please Approve Appointment Through Email Or Phone! !!"})
            
          }
            
          const doctorId = isConflict[0]._id;
          const patientId = req.user._id;
    
           const createappointment = await appointmentmodel.create({
              firstName,
              lastName,
              email,
              phone,
              aadhar,
              dob,
              gender,
              appointment_date,
              department,
              doctor: {
                firstName: doctor_firstName,
                lastName: doctor_lastName,
              },
              hasVisited,
              address,
              doctorId,
              patientId,
            });
    
            return res.status(200).json({message:"Appointment Send SuccessFully !!"});
          
        
    } catch (error) {
        if (error.name === "ValidationError") {
            
            const errormessage= Object.values(error.errors).map(err=>err.message);
            return res.status(400).json({
              message: errormessage
            });
          }
      

        res.status(500).json({message : "Internal Sever Error"});
    }
      
      


}


exports.getallappointment=async(req,res)=>{
  try {
  const allappointment=await appointmentmodel.find();
  return res.status(200).json({allappointment});  
  } catch (error) {
    res.status(500).json({message : "Internal Sever Error"}); 
  }
}


exports.deleteappointment=async(req,res)=>{
  try {
    const id=req.params.id;
    const appointmentdata=await appointmentmodel.findOne({_id:id});
    if(!appointmentdata){
    return res.status(404).json({message : "Appointment not found"}); 
    }
    await appointmentdata.deleteOne();

  } catch (error) {
    return res.status(500).json({message : "Internal Sever Error"}); 
    
  }

}

exports.updateappointment = async (req, res) => {
  const id = req.params.id;


  try {
    const appointmentdata = await appointmentmodel.findOne({ _id: id });
   

    if (!appointmentdata) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const updateddata = req.body;  
   

    if (updateddata) {
     
      await appointmentmodel.updateOne(
        { _id: id },
        { $set: updateddata }  
      );

      return res.status(200).json({ message: "Appointment updated successfully!" });
    } else {
      return res.status(400).json({ message: "No data provided to update" }); 
    }
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
