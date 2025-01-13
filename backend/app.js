require('dotenv').config()
const express=require('express')

const app = express();
const cors = require('cors');
const PORT=process.env.PORT || 3000
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const { mesaegeRoutes } = require('./Routes/messageRoutes');
const { userRoutes } = require('./Routes/userRoutes');
const { adminRoutes } = require('./Routes/adminRoutes');
const { appointmentRoutes } = require('./Routes/appointmentRoutes');


app.use(cors()); 

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}))

app.use(fileUpload({

    useTempFiles : true, 
    tempFileDir :"/tmp"
})
)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


try {
    mongoose.connect(process.env.MONGODB_URL)
     console.log("mongodb connected successfully!!!!!!");
} catch (error) {
    console.log("mongobd error",error)
}

app.use('/api/message',mesaegeRoutes);
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/user/appointment',appointmentRoutes) 


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
})
