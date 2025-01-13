
exports.adminmiddleware=(req,res,next)=>{
   
   
    try {
        const AdminRole=req.user.role;
        // console.log("role------",AdminRole)
        if(AdminRole!=="Admin"){
        return res.status(401).json({message:"Only Admin access this Features !!"})
        }
        
            next();

        

        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error !!"})
    }

  
}