import { useEffect, useState } from 'react'
import { getStoredRecipes } from './recipeStorage'

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const syncRecipes = () => setRecipes(getStoredRecipes())

    syncRecipes()
    window.addEventListener('recipe-finder-recipes-updated', syncRecipes)

    return () => {
      window.removeEventListener('recipe-finder-recipes-updated', syncRecipes)
    }
  }, [])

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>All Recipes</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Here are all the recipes added through the add recipe form.
      </p>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes by name"
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          marginBottom: 16,
        }}
      />

      {recipes.length === 0 ? (
        <div
          style={{
            padding: 20,
            border: '1px solid #ddd',
            borderRadius: 8,
            background: '#fff',
          }}
        >
          No recipes added yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {recipes
            .filter((recipe) =>
              recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((recipe) => (
            <div
              key={recipe.id}
              style={{
                padding: 16,
                border: '1px solid #ddd',
                borderRadius: 8,
                background: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <h3 style={{ margin: '0 0 6px' }}>{recipe.recipeName}</h3>
              <p style={{ margin: '0 0 6px', color: '#6b7280' }}>
                <strong>Type:</strong> {recipe.recipeType}
              </p>
              <p style={{ margin: 0 }}>{recipe.recipeDescription}</p>
            </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Recipes
