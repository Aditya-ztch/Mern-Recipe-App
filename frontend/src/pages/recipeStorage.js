const RECIPES_UPDATED_EVENT = 'recipe-finder-recipes-updated'
let recipes = []

function emitRecipesUpdated() {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new Event(RECIPES_UPDATED_EVENT))
}

export function getStoredRecipes() {
  return recipes
}

export function saveRecipes(nextRecipes) {
  recipes = nextRecipes
  emitRecipesUpdated()
}

export function addRecipe(recipe) {
  const newRecipe = {
    ...recipe,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  }

  saveRecipes([...recipes, newRecipe])
  return newRecipe
}

export function deleteRecipe(id) {
  const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
  saveRecipes(updatedRecipes)
  return updatedRecipes
}
