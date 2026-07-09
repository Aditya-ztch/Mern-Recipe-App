import { useEffect, useState } from 'react'
import { deleteUserRecipe, fetchUserRecipes, getAuthUser } from '../api'
import { RecipeCard } from './Recipes'

function MyRecipes() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const auth = getAuthUser()
  const userId = auth?.user?._id

  useEffect(() => {
    let ignore = false

    const loadRecipes = async () => {
      if (!userId) {
        setLoading(false)
        setRecipes([])
        return
      }

      setLoading(true)
      setError('')

      try {
        const data = await fetchUserRecipes(userId)
        if (!ignore) setRecipes(data.Recipes || [])
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadRecipes()

    return () => {
      ignore = true
    }
  }, [userId])

  const handleDelete = async (recipeId) => {
    setError('')

    try {
      await deleteUserRecipe(userId, recipeId)
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId))
    } catch (err) {
      setError(err.message)
    }
  }

  const visibleRecipes = recipes.filter((recipe) =>
    (recipe.Title || '').toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: 8 }}>Your Recipes</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Recipes you've created and saved.
      </p>

      {!userId ? (
        <RecipeMessage>Please login to view your recipes.</RecipeMessage>
      ) : (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your recipes by title"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #ccc',
              marginBottom: 16,
              boxSizing: 'border-box',
            }}
          />

          {error ? (
            <div role="alert" style={{ color: '#b00020', marginBottom: 12 }}>
              {error}
            </div>
          ) : null}

          {loading ? (
            <RecipeMessage>Loading your recipes...</RecipeMessage>
          ) : visibleRecipes.length === 0 ? (
            <RecipeMessage>You haven't created any recipes yet.</RecipeMessage>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {visibleRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  action={
                    <button
                      type="button"
                      onClick={() => handleDelete(recipe._id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: '1px solid #fca5a5',
                        background: '#fff',
                        color: '#b00020',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      Delete
                    </button>
                  }
                />
              ))}
            </div>
          )}
        </>
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

export default MyRecipes
