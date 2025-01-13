const express = require('express');
const { addnewadmin, addnewdoctor } = require('../controllers/admincontol');
const { authmiddelware } = require('../middelwares/authmiddelware');
const { adminmiddleware } = require('../middelwares/adminmiddelware');

const adminRoutes= express.Router();

adminRoutes.post('/addadmin',authmiddelware,adminmiddleware, addnewadmin)
adminRoutes.post('/new/doctor',authmiddelware,adminmiddleware, addnewdoctor)


exports.adminRoutes=adminRoutes;