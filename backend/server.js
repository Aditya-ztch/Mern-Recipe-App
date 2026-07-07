const express=require('express');
const app=express();
const env=require('dotenv');
env.config();



//middleware
app.use(express.json());

//db connection
const DBConnect=require("./config/db");
DBConnect(); //connecting to Db

//router connection
const UserRouter=require('./Router/UserRouter');
const RecipeRouter=require('./Router/RecipeRouter');
app.use("/api",UserRouter);
app.use("/api",RecipeRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server running successfully :",process.env.PORT);
})