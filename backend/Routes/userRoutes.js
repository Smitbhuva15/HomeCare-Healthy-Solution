const express = require('express');
const { patientregistration, login, getdoctorDetail } = require('../controllers/patientRegistration');
const { authmiddelware } = require('../middelwares/authmiddelware');
const { userdata } = require('../controllers/useDataControl');
const userRoutes = express.Router();


// Route to register patient
userRoutes.post('/patient/register', patientregistration);
userRoutes.post('/login', login);
userRoutes.get('/auth', authmiddelware,userdata)
userRoutes.get('/getdatadoctor',getdoctorDetail );

exports.userRoutes = userRoutes;