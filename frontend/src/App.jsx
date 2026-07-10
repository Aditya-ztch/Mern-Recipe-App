import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import AddRecipe from './pages/AddRecipe'
import DeleteRecipe from './pages/DeleteRecipe'
import Login from './pages/Login'
import Recipes from './pages/Recipes'
import Register from './pages/Register'
import MyRecipes from './pages/MyRecipes'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppShell() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const linkStyle = ({ isActive }) => ({
    color: 'white',
    fontWeight: isActive ? 700 : 500,
    textDecoration: 'none',
    padding: '8px 10px',
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', margin: 0, border: 0, padding: 0, background: '#e8d8c4', color: '#111827' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          padding: '14px 24px',
          margin: '16px',
          border: 0,
          borderRadius: 0,
          background: '#dc2626',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700 }}>Recipe Finder</div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <NavLink to="/recipes" style={linkStyle}>Home</NavLink>

          {!isAuthenticated && (
            <>
              <NavLink to="/login" style={linkStyle}>Login</NavLink>
              <NavLink to="/register" style={linkStyle}>Register</NavLink>
            </>
          )}

          <NavLink to="/recipes" style={linkStyle}>Recipes</NavLink>
          <NavLink to="/add-recipe" style={linkStyle}>Add Recipe</NavLink>
      
          <NavLink to="/delete-recipe" style={linkStyle}>Delete Recipe</NavLink>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                color: 'white',
                fontWeight: 500,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 6,
                padding: '8px 10px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 16px 32px',
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
         
          <Route path="/delete-recipe" element={<DeleteRecipe />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}

export default App