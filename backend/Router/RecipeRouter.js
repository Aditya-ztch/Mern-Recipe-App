const express=require('express');
const router=express.Router();
const{CreateRecipe,DisplayRecipe,DisplayUserRecipes,DeleteUserRecipe,SearchRecipe}=require('../controllers/Recipe');
//creating the recipe
router.post("/:aid/create-recipe",CreateRecipe);
//Displaying recipe
router.get("/display-recipe",DisplayRecipe);
//Displaying user recipe
router.get("/:aid/user-recipe",DisplayUserRecipes);
//Displaying User Recipe
//note : only user can delete its recipe
router.delete("/:aid/:rid/delete-recipe",DeleteUserRecipe);
//searching recipe by name and ingredients
router.get("/search-recipe",SearchRecipe);

module.exports=router;