const express=require('express');
const app=express();
const env=require('dotenv');
env.config();



//middleware
app.use(express.json());
const allowedOrigins=[
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173'
].filter(Boolean);

app.use((req,res,next)=>{
    const origin=req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin',origin);
    }
    res.header('Access-Control-Allow-Methods','GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(204);
    }
    next();
});

//db connection
const DBConnect=require("./config/db");
DBConnect(); //connecting to Db

//router connection
const UserRouter=require('./Router/UserRouter');
const RecipeRouter=require('./Router/RecipeRouter');
app.use("/api",UserRouter);
app.use("/api",RecipeRouter);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server running successfully :",PORT);
})
