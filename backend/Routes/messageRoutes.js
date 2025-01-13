 const express= require('express');
const { messagecontrol, getallmeassage } = require('../controllers/messageContorl');
 const mesaegeRoutes=express.Router();
 
 mesaegeRoutes.post('/send',messagecontrol);
 mesaegeRoutes.get('/get/all/message',getallmeassage)
 

 exports.mesaegeRoutes=mesaegeRoutes;