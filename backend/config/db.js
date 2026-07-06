const mongoose=require('mongoose');
const DBConnect=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Failed to Connect Database",error);
        
    }
};
module.exports=DBConnect;