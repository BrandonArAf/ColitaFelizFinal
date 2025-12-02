import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar(){
  const { user, logout } = useAuth();

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-light sticky-top"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,250,0.98) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        borderBottom: '2px solid rgba(167, 243, 208, 0.3)'
      }}
    >
      <div className="container">
        <Link 
          to="/" 
          className="navbar-brand d-flex align-items-center gap-3"
          style={{
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div 
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              fontSize: '1.5rem',
              boxShadow: '0 4px 15px rgba(167, 243, 208, 0.4)',
              background: 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)'
            }}
          >
            <i className="fas fa-paw"></i>
          </div>
          <div>
            <span className="fw-bold fs-4 d-block" style={{
              background: 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Colita Feliz
            </span>
            <div className="small text-muted fw-medium">Guardería Canina</div>
          </div>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#nav" 
          aria-controls="nav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-home me-2"></i>Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/servicios"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-star me-2"></i>Servicios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/registro"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-paw me-2"></i>Registro
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/nosotros"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-users me-2"></i>Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/contacto"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-envelope me-2"></i>Contacto
              </NavLink>
            </li>

            {(user?.rol === 'ADMINISTRADOR' || user?.rol === 'VENDEDOR') && (
              <li className="nav-item">
                <NavLink 
                  className="nav-link fw-semibold px-3" 
                  to="/admin"
                  style={({ isActive }) => ({
                    color: isActive ? '#dc3545' : '#6c757d',
                    backgroundColor: isActive ? '#f8d7da' : 'transparent',
                    borderRadius: '8px'
                  })}
                >
                  <i className="fas fa-cog me-2"></i>Admin
                </NavLink>
              </li>
            )}

            {!user && (
              <li className="nav-item">
                <NavLink 
                  className="nav-link fw-semibold px-3" 
                  to="/login"
                  style={({ isActive }) => ({
                    color: isActive ? '#0d6efd' : '#6c757d',
                    backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                    borderRadius: '8px'
                  })}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>Ingresar
                </NavLink>
              </li>
            )}

            {user && (
              <li className="nav-item ms-2">
                <button
                  className="btn btn-outline-secondary btn-sm fw-semibold"
                  onClick={logout}
                  style={{
                    borderRadius: '10px',
                    padding: '8px 16px',
                    transition: 'all 0.3s ease',
                    borderWidth: '2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Cerrar sesión ({user.nombre})
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
