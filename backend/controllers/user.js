const users=require('../models/UserModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//register user
const RegisterUser=async(req,res)=>{
    const{Fname,Lname,Email,Password,Phone,Gender,City,Country}=req.body;
    const Hashed=await bcrypt.hash(Password,10)
    try {
        const Registered=await users.create({
            Fname,
            Lname,
            Email,
            Password:Hashed,
            Gender,
            Phone,
            City,
            Country
        });
        res.status(200).json({message:"User Registered Successfully",Registered});
    } catch (error) {
        res.status(500).json({message:"Unable to Register user"})
        
    }

}
//login user
const LoginUser=async(req,res)=>{
    const {email,password}=req.body;
    const FoundUser=await users.findOne({Email:email});
    if(FoundUser){
        const ComparedPassword=await bcrypt.compare(password,FoundUser.Password);
        if(ComparedPassword){
           const token=await jwt.sign({userId:FoundUser._id,email:FoundUser.Email},process.env.secret_key);
           res.status(200).json({message:"user Login success",FoundUser,token})

        }else{
            res.status(500).json({message:"Incorrect password"})
        }
    }
    else{
        res.status(404).json({message:"User Not Found"});
    }
    
}
module.exports={RegisterUser,LoginUser};
