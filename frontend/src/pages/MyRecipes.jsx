import { useEffect, useState } from 'react'
import { getStoredRecipes, deleteRecipe } from './recipeStorage'

const difficultyColors = {
  Easy: { bg: '#dcfce7', text: '#166534' },
  Medium: { bg: '#fef9c3', text: '#854d0e' },
  Hard: { bg: '#fee2e2', text: '#991b1b' },
}

// Until real auth is wired up, the "current user" is just a name/id
// stored on this device. Swap this out for your auth context/session
// once login is in place (e.g. currentUser._id from a JWT or session).
const CURRENT_USER = 'You'

function MyRecipes({ currentUser = CURRENT_USER }) {
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

  const myRecipes = recipes.filter((recipe) => {
    const author = recipe.author
    const authorName =
      typeof author === 'string' ? author : author?.name || author?.username

    // Recipes saved without an author are treated as belonging to
    // whoever created them on this device.
    return !author || authorName === currentUser
  })

  const handleDelete = (id) => {
    deleteRecipe(id)
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: 8 }}>Your Recipes</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Recipes you've created and saved.
      </p>

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

      {myRecipes.length === 0 ? (
        <div
          style={{
            padding: 20,
            border: '1px solid #ddd',
            borderRadius: 8,
            background: '#fff',
          }}
        >
          You haven't created any recipes yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {myRecipes
            .filter((recipe) =>
              (recipe.Title || '').toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((recipe) => {
              const difficultyStyle = difficultyColors[recipe.difficulty] || {
                bg: '#e5e7eb',
                text: '#374151',
              }
              const recipeId = recipe._id || recipe.id

              return (
                <div
                  key={recipeId}
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
                            <li key={idx} style={{ fontSize: 14 }}>
                              {ing.name}
                              {ing.quantity ? ` — ${ing.quantity}` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(recipeId)}
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
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default MyRecipes