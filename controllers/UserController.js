const User=require("../models/User")
const jwt=require("jsonwebtoken")
const {generateSalt,matchPassword}=require("../helper/saltGenerator")
const signup=async(req,res)=>{

    const{email,password,name}=req.body

    try{
        const findUser=await User.findOne({email})
        if(!findUser)
        {
            const encryptedPass=await generateSalt(password)
            const createdUser=await User.create({
                email,
                name,
                password:encryptedPass
            })

            res.json({msg:"User created successfully",data:createdUser})
        }
        else{
            res.json({msg:"User already exists"}).status(400)
        }
        
    }catch(err)
    {
        res.status(400).json({msg:"something went wrong",err:err.message})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const userGet=await User.findOne({email})

        if(userGet && await matchPassword(password,userGet?.password)){
            let token;
            token=await jwt.sign({email:userGet.email,id:userGet._id},process.env.APPSETTING_JWT_SECRET)
            return res.status(201).json({message:"success",token})
        }
        
        return res.status(401).json({message:"User not found or Check password",user:null})
        
    }catch(err){
        res.status(500).json({message:"something went wrong",err:err.message})
    }
}

module.exports={signup,login}