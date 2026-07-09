const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const AUTH_STORAGE_KEY = 'recipe-finder-auth'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY))
  } catch {
    return null
  }
}

export function saveAuthUser(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function registerUser(payload) {
  return request('/register-user', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload) {
  return request('/login-user', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchRecipes() {
  return request('/display-recipe')
}

export function searchRecipes(data) {
  return request(`/search-recipe?data=${encodeURIComponent(data)}`)
}

export function createRecipe(authorId, payload) {
  return request(`/${authorId}/create-recipe`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchUserRecipes(authorId) {
  return request(`/${authorId}/user-recipe`)
}

export function deleteUserRecipe(authorId, recipeId) {
  return request(`/${authorId}/${recipeId}/delete-recipe`, {
    method: 'DELETE',
  })
}
