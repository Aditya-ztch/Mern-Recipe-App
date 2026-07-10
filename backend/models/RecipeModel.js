const mongoose=require('mongoose');
const recipeSchema=new mongoose.Schema({
    Title:{type:String,required:true},
    description:{type:String,required:true},
     ingredients: [{ type: String }],
    difficulty:{
        type:String,enum:['Easy','Medium','Hard']
    },
    image:{
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }

},{
    timestamps:true,
})
module.exports=mongoose.model("recipe",recipeSchema);