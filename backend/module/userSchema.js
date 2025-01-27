const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken'); // Make sure jwt is required

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"]
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide A Valid Email!"]
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"]
  },
  aadhar: {
    type: String,
    required: [true, "Aadhar Number Is Required!"],
    minLength: [12, "Aadhar Number Must Contain Exact 12 Digits!"],
    maxLength: [12, "Aadhar Number Must Contain Exact 12 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"]
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
  password: {
    type: String,
    required: true,
  },
  
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Doctor", "Admin"]
  },
  doctorDepartment: {
    type: String
  },
  docAvatar: {
    public_id: String,
    url: String
  }
});



// JWT token generation method
userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
}; 

const userModel = mongoose.model("User", userSchema);
exports.userModel = userModel;
