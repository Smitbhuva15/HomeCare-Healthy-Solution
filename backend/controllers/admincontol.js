const { userModel } = require("../module/userSchema");
const bcrypt = require('bcryptjs');


exports.addnewadmin=async(req,res)=>{
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password
        
      } = req.body;
  
      if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password ) {
        return res.status(400).json({ message: "Please Fill All The Fields!!" });
      }
  
      const addminExist = await userModel.findOne({ email });
      if (addminExist) {
        return res.status(400).json({ message: `${addminExist.role} With This Email Already Exists!` });
      }
      const hashPassword = await bcrypt.hash(password, 10);
  
      const createadmin=await userModel.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password:hashPassword,
        role:"Admin"
      })
  
      return res.status(200).json({
         message: 'admin register succesfully' ,
         admin_token:await createadmin.generateToken(),
         id:createadmin._id
        });
      
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: errorMessages });
      }
    
     
      return res.status(500).json({ message: "Internal Server Error!!" });
      
    }
  
  }



  exports.addnewdoctor= async(req,res)=>{
try {
  if(!req.files || Object.keys(req.files).length===0){
    return res.status(400).json({message:"Doctor Avatar Require !!"})
  }
  const {docAvatar}=req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if(!allowedFormats.includes(docAvatar.mimetype)){
    return res.status(400).json({message:"File Format Not Supported !!"})
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return res.status(400).json({message:"Please Fill Full Form! !!"})
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return res.status(400).json({message:`${isRegistered.role} already resisterd with this email`})
  }

 const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return res.status(500).json({message:"Failed To Upload Doctor Avatar To Cloudinary !!"})

  }

  const newdoccreate=await userModel.create({
    firstName,
  lastName,
  email,
  phone,
  nic,
  dob,
  gender,
  password,
  role: "Doctor",
  doctorDepartment,
  docAvatar: {
    public_id: cloudinaryResponse.public_id,
    url: cloudinaryResponse.secure_url,
  },
  })

  res.status(200).json({ message: "New Doctor Registered", 
    doctor,
  });
  
} catch (error) {
  return res.status(500).json({ message: "Internal Server Error!!" });
}
    
  }
  
  
  