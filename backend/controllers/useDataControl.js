
exports.userdata = async (req, res) => {
    try {
        const user_data = req.user;
        // console.log(user_data);
        return res.status(200).json(user_data);
    } catch (error) {

        return res.status(500).json({ message: "Internal Server Error" });
    }


}
 
