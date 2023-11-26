const jwt=require("jsonwebtoken")
const User=require("../models/User")

const protect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log(process.env.APPSETTING_JWT_SECRET);
            const decoded = jwt.verify(token, process.env.APPSETTING_JWT_SECRET);
            const userdetails = await User.findOne(
                {
                    email:decoded?.email
                }
            ).select("-password");
            
            if (userdetails) {
                req.userDetails = userdetails
                next();
            } else {
                res.status(404).json({ message: "User not found", status: false })
            }

        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "Error",status:false })
        }
    } else {
        res.status(401).json({ message: "Not Authorized, No Token!", status: false });
    }
}

module.exports=protect;