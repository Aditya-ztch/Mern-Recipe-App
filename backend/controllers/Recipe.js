const RecipeModel=require('../models/RecipeModel');

//creating Recipe
const CreateRecipe=async (req,res)=>{
    const {Title,description,ingredients,difficulty,image }=req.body;
    const authorId=req.params.aid;
    try {
        const CreatedRecipe=await RecipeModel.insertOne({
        Title,
        description,
        ingredients,
        difficulty,
        image,
        author:authorId
    });
    
    res.status(200).json({message:"Recipe Added Successfully",CreatedRecipe});
    } catch (error) {
        res.status(500).json({message:"Unable to Add recipe"});
        
    }
}
//Display Recipe
const DisplayRecipe=async(req,res)=>{
    try {
        const Recipes= await RecipeModel.find();
        
        res.status(200).json({message:"Recipe fetched Successfully",Recipes});
    } catch (error) {
        res.status(500).json({message:"Unable to fetch product"});
        
    }

}
//Displaying Users Recipe
const DisplayUserRecipes=async(req,res)=>{
    const authorId=req.params.aid;
    try {
        const Recipes= await RecipeModel.find({author:authorId});
        
        res.status(200).json({message:"User Recipes fetched Successfully",Recipes});
    } catch (error) {
        res.status(500).json({message:"Unable to fetch product"});
        
    }

}
//User Deleting its Recipe
const DeleteUserRecipe=async(req,res)=>{
    const authorId=req.params.aid;
    const recipeId=req.params.rid;
    try {
         const Recipe= await RecipeModel.findOneAndDelete({
            _id:recipeId,
            author:authorId
         });
         if(!Recipe){
             res.status(404).json({message:"Recipe Not Found"});
         }
     
        res.status(200).json({message:"Recipe Deleted Successfully",Recipe})
       
    } catch (error) {
        res.status(500).json({message:"Unable to Delete Recipe"});
    }
   
    
}
//Searching Recipe by name or ingredients
const SearchRecipe=async(req,res)=>{
    const searchData=req.query.data;
    console.log(searchData);
    try {
    const FoundRecipe=await RecipeModel.find({
    $or: [
    { Title: { $regex: searchData, $options: "i" } },  //here option i means they will consider both uppercase and lowercase same 
    {"ingredients.name": { $regex: searchData, $options: "i" } }
  ]
});
  if(FoundRecipe){
    res.status(200).json({message:"Search sucessfull",FoundRecipe});
  } 
  else{
    res.status(404).json({message:"Recipe Doesnt exist"})
  }

        
    } catch (error) {
        res.status(500).json({message:"Unable to Search"});
    }
}

module.exports={CreateRecipe,DisplayRecipe,DisplayUserRecipes,DeleteUserRecipe,SearchRecipe};