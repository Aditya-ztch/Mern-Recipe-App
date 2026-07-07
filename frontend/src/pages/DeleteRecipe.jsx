import { useEffect, useState } from 'react'
import { deleteRecipe, getStoredRecipes } from './recipeStorage'

function DeleteRecipe() {
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

  const handleDelete = (id) => {
    const updatedRecipes = deleteRecipe(id)
    setRecipes(updatedRecipes)
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Delete Recipe</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Manage the recipes you have added.
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
        <p>No recipes added yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={tableCellStyle}>Recipe Type</th>
                <th style={tableCellStyle}>Recipe Name</th>
                <th style={tableCellStyle}>Recipe Description</th>
                <th style={tableCellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recipes
                .filter((recipe) =>
                  recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((recipe) => (
                <tr key={recipe.id}>
                  <td style={tableCellStyle}>{recipe.recipeType}</td>
                  <td style={tableCellStyle}>{recipe.recipeName}</td>
                  <td style={tableCellStyle}>{recipe.recipeDescription}</td>
                  <td style={tableCellStyle}>
                    <button
                      type="button"
                      onClick={() => handleDelete(recipe.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 6,
                        border: 'none',
                        cursor: 'pointer',
                        background: '#dc2626',
                        color: 'white',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const tableCellStyle = {
  border: '1px solid #e5e7eb',
  padding: '10px 12px',
  textAlign: 'left',
  verticalAlign: 'top',
}

export default DeleteRecipe
