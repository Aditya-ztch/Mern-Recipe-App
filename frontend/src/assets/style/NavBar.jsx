import { NavLink } from 'react-router-dom'

function NavBar() {
  const linkClass = ({ isActive }) => {
    return `nav-link ${isActive ? 'active' : ''}`
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#dc2626' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand me-3" to="/">
          Recipe Finder
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/login" className={linkClass} end>
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/register" className={linkClass}>
                Registration
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/add-recipe" className={linkClass}>
                AddRecipe
              </NavLink>
            </li> 
             <li className="nav-item">
              <NavLink to="/user-recipe" className={linkClass}>
                Your Recipe
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/delete-recipe" className={linkClass}>
                DeleteRecipe
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

