const express=require('express');
const router=express.Router();
const {RegisterUser,LoginUser}=require('../controllers/user')
//Register User
router.post("/register-user",RegisterUser);
//Login User
router.post("/login-user",LoginUser)

//export
module.exports=router;