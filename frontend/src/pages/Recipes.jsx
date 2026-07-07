import { useEffect, useState } from 'react'
import { fetchRecipes, searchRecipes } from '../api'

const difficultyColors = {
  Easy: { bg: '#dcfce7', text: '#166534' },
  Medium: { bg: '#fef9c3', text: '#854d0e' },
  Hard: { bg: '#fee2e2', text: '#991b1b' },
}

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadRecipes = async () => {
      setLoading(true)
      setError('')

      try {
        const data = searchTerm.trim()
          ? await searchRecipes(searchTerm.trim())
          : await fetchRecipes()

        if (!ignore) {
          setRecipes(data.Recipes || data.FoundRecipe || [])
        }
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    const timeoutId = setTimeout(loadRecipes, searchTerm.trim() ? 300 : 0)

    return () => {
      ignore = true
      clearTimeout(timeoutId)
    }
  }, [searchTerm])

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>All Recipes</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Recipes loaded from the backend.
      </p>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes by title or ingredient"
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          marginBottom: 16,
        }}
      />

      {error ? (
        <div role="alert" style={{ color: '#b00020', marginBottom: 12 }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <RecipeMessage>Loading recipes...</RecipeMessage>
      ) : recipes.length === 0 ? (
        <RecipeMessage>No recipes found.</RecipeMessage>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

function RecipeMessage({ children }) {
  return (
    <div
      style={{
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 8,
        background: '#fff',
      }}
    >
      {children}
    </div>
  )
}

export function RecipeCard({ recipe, action }) {
  const difficultyStyle = difficultyColors[recipe.difficulty] || {
    bg: '#e5e7eb',
    text: '#374151',
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        border: '1px solid #ddd',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.Title}
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: 8,
            flexShrink: 0,
          }}
        />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            marginBottom: 6,
          }}
        >
          <h3 style={{ margin: 0 }}>{recipe.Title}</h3>
          {recipe.difficulty && (
            <span
              style={{
                padding: '2px 10px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: difficultyStyle.bg,
                color: difficultyStyle.text,
                whiteSpace: 'nowrap',
              }}
            >
              {recipe.difficulty}
            </span>
          )}
        </div>

        <p style={{ margin: '0 0 10px', color: '#374151' }}>
          {recipe.description}
        </p>

        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
          <div style={{ margin: '0 0 10px' }}>
            <strong style={{ fontSize: 13, color: '#6b7280' }}>
              Ingredients:
            </strong>
            <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
              {recipe.ingredients.map((ing, idx) => (
                <li key={`${ing.name}-${idx}`} style={{ fontSize: 14 }}>
                  {ing.name}
                  {ing.quantity ? ` - ${ing.quantity}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {action}
      </div>
    </div>
  )
}

export default Recipes
