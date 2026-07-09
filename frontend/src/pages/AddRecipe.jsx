import { useState } from 'react'
import { createRecipe, getAuthUser } from '../api'

const emptyIngredient = { name: '', quantity: '' }

function AddRecipe() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')
  const [image, setImage] = useState('')
  const [ingredients, setIngredients] = useState([{ ...emptyIngredient }])

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const updateIngredient = (index, field, value) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    )
  }

  const addIngredientRow = () => {
    setIngredients((prev) => [...prev, { ...emptyIngredient }])
  }

  const removeIngredientRow = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!title.trim()) return setError('Title is required')
    if (!description.trim()) return setError('Description is required')

    const auth = getAuthUser()

    if (!auth?.user?._id) {
      return setError('Please login before adding a recipe')
    }

    const cleanedIngredients = ingredients
      .map((ing) => ({ name: ing.name.trim(), quantity: ing.quantity.trim() }))
      .filter((ing) => ing.name)

    if (cleanedIngredients.length === 0)
      return setError('At least one ingredient is required')

    const payload = {
      Title: title.trim(),
      description: description.trim(),
      ingredients: cleanedIngredients,
      difficulty,
      image: image.trim(),
    }

    try {
      await createRecipe(auth.user._id, payload)
      setTitle('')
      setDescription('')
      setDifficulty('Easy')
      setImage('')
      setIngredients([{ ...emptyIngredient }])
      setSuccessMessage('Recipe saved successfully!')
    } catch (err) {
      setError(err.message)
    }
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
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Chicken Curry"
            autoComplete="off"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Difficulty</span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Image URL</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            autoComplete="off"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

        <div style={{ display: 'grid', gap: 8 }}>
          <span>Ingredients</span>

          {ingredients.map((ing, index) => (
            <div
              key={index}
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                placeholder="Ingredient name"
                autoComplete="off"
                style={{
                  flex: 2,
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #ccc',
                }}
              />
              <input
                type="text"
                value={ing.quantity}
                onChange={(e) =>
                  updateIngredient(index, 'quantity', e.target.value)
                }
                placeholder="Quantity"
                autoComplete="off"
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #ccc',
                }}
              />
              <button
                type="button"
                onClick={() => removeIngredientRow(index)}
                disabled={ingredients.length === 1}
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  background: '#fff',
                  cursor: ingredients.length === 1 ? 'not-allowed' : 'pointer',
                  color: '#b00020',
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredientRow}
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px dashed #2563eb',
              background: '#fff',
              color: '#2563eb',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            + Add Ingredient
          </button>
        </div>

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
