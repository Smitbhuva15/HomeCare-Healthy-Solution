const jwt = require('jsonwebtoken');
const { userModel } = require('../module/userSchema');

exports.authmiddelware = async (req, res, next) => {
    const token = req.header('authorization');

    if (!token) {
        return res.status(400).json({ message: "User is not authenticated !!" });
    }
    const jwtToken = token.split(" ")[1];
    
//    console.log(jwtToken)
    if (!jwtToken) {
        return res.status(400).json({ message: "Token is missing" });
    }

    try {

        const userSmallInfo = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        const _id = userSmallInfo.id;
        const user_data = await userModel.findOne({_id:userSmallInfo.id },{password:0})
        

        req.user = user_data

        next();


    } catch (error) {
        console.error(error);

        return res.status(401).json({ message: "You Need To Log In First !!" });
    }
};
