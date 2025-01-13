const { userModel } = require("../module/userSchema");
const bcrypt = require('bcryptjs');

exports.patientregistration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role
    } = req.body;

    // Validate that all fields are provided

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role) {
      return res.status(400).json({ message: "Please Fill All The Fields!!" });
    }

    // Check if user already exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Registered!!" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const createUser = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password: hashPassword,
      role
    });

    
    return res.status(201).json({
      message: "User Registered Successfully!!",
      id: createUser._id,
      patient_token: await createUser.generateToken()
    });
    
  } catch (error) {
    // If there are validation errors, return them
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errorMessages });
    }
  
   
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
};




exports.login = async (req, res) => {
    try {
        const { email, password, confirmPassword, role } = req.body;

        if (!email || !password || !confirmPassword || !role) {
            return res.status(401).json({ message: "Please Fill All The Fields !!" });
        }

        const existuser = await userModel.findOne({ email });
        if (!existuser) {
            return res.status(401).json({ message: "User Does Not Exist !!" });
        }
          
        // Check password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password & Confirm Password Do Not Match !!" });
        }

        const Ismatching = await bcrypt.compare(password, existuser.password);
       
        if (!Ismatching) {
            return res.status(400).json({ message: "Invalid Email Or Password !!" });
        }

       
        if (role !== existuser.role) {
            return res.status(400).json({ message: "User Not Found With This Role !!" });
        }
        
        return res.status(200).json({ 
          message: "User Login Successfully !!",
          patient_token :await existuser.generateToken(),
          id:existuser._id
        })

    } catch (error) {
        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errorMessages });
        }

        return res.status(500).json({ message: "Internal Server Error!!" });
    }
};


exports.getdoctorDetail=async (req,res)=>{
  try {
    const doctorData=await userModel.find({role: "Doctor"})

    return res.status(200).json({doctorData})
    
  } catch (error) {
    
    return res.status(500).json({message:"Internal Server Eroor!"})
  }

}


