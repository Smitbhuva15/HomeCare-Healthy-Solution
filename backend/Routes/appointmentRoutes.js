const express = require('express');
const { authmiddelware } = require('../middelwares/authmiddelware');
const { sendappointment, getallappointment, deleteappointment, updateappointment } = require('../controllers/appointmentControl');
const { adminmiddleware } = require('../middelwares/adminmiddelware');


const appointmentRoutes= express.Router();

appointmentRoutes.post('/send',authmiddelware,sendappointment)
appointmentRoutes.get('/getall',authmiddelware,adminmiddleware,getallappointment)
appointmentRoutes.delete('/delete/:id',authmiddelware,adminmiddleware,deleteappointment)
appointmentRoutes.patch('/update/:id',authmiddelware,adminmiddleware,updateappointment)




exports.appointmentRoutes=appointmentRoutes 
