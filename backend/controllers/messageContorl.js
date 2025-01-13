const { messageModel } = require("../module/messageSchema");


exports.messagecontrol=async(req,res)=>{
    try {
        const{firstName,lastName,email,phone,message}=req.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({ message: "Please Fill All Fields" });
        }

        const createmessage=await messageModel.create({
           firstName,
           lastName,
           email,
           phone,
           message
        })

        
        res.status(200).json({message:"Message Send Successfull !!"});
        
    } catch (error) {
        
        if (error.name === "ValidationError") {
            
            const errormessage= Object.values(error.errors).map(err=>err.message);
           
            return res.status(400).json({
              message: errormessage
            });
          }
      

        res.status(500).json("Error is found in send the Message" ,error);
        
    }
}


exports.getallmeassage=async(req,res)=>{
    try {
        const allmessage=await messageModel.find();
        return res.status(200).json({allmessage})


    } catch (error) {
        return res.status(500).json({message:"Internal Server Eroor!"})
    }
}