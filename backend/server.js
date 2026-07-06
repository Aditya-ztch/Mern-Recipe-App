const express=require('express');
app=express();
const env=require('dotenv');
env.config();
DBConnect=require("./config/db");
DBConnect(); //connecting to Db
app.listen(process.env.PORT,()=>{
    console.log("Server running successfully :",process.env.PORT);
})