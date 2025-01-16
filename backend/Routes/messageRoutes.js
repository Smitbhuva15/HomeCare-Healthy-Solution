 const express= require('express');
const { messagecontrol, getallmeassage } = require('../controllers/messageContorl');
const { authmiddelware } = require('../middelwares/authmiddelware');
const { adminmiddleware } = require('../middelwares/adminmiddelware');
 const mesaegeRoutes=express.Router();
 
 mesaegeRoutes.post('/send',messagecontrol);
 mesaegeRoutes.get('/get/all/message',authmiddelware,adminmiddleware,getallmeassage)
 

 exports.mesaegeRoutes=mesaegeRoutes;