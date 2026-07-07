import { useState } from 'react'
import { addRecipe } from './recipeStorage'

function AddRecipe() {
  const [recipeName, setRecipeName] = useState('')
  const [recipeType, setRecipeType] = useState('')
  const [recipeDescription, setRecipeDescription] = useState('')

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!recipeName.trim()) return setError('Recipe Name is required')
    if (!recipeType.trim()) return setError('Recipe Type is required')
    if (!recipeDescription.trim())
      return setError('Recipe Description is required')

    const payload = {
      recipeName: recipeName.trim(),
      recipeType: recipeType.trim(),
      recipeDescription: recipeDescription.trim(),
    }

    addRecipe(payload)
    setRecipeName('')
    setRecipeType('')
    setRecipeDescription('')
    setSuccessMessage('Recipe saved successfully!')
  }

  return (
    <div
      className="add-recipe-page"
      style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}
    >
      <h2 style={{ marginBottom: 8 }}>Add Recipe</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Enter the recipe details.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Recipe Name</span>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="e.g. Chicken Curry"
            autoComplete="off"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Recipe Type</span>
          <input
            type="text"
            value={recipeType}
            onChange={(e) => setRecipeType(e.target.value)}
            placeholder="e.g. Dinner, Vegetarian, Dessert"
            autoComplete="off"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Recipe Description</span>
          <textarea
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
            placeholder="Write a short description..."
            rows={5}
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              resize: 'vertical',
            }}
          />
        </label>

        {error ? (
          <div role="alert" style={{ color: '#b00020', fontSize: 14 }}>
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div style={{ color: '#166534', fontSize: 14 }}>{successMessage}</div>
        ) : null}

        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            background: '#2563eb',
            color: 'white',
            fontWeight: 700,
          }}
        >
          Save Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipe

