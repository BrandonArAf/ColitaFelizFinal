import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      // Redirigir según el rol del usuario
      if (result.user.rol === 'ADMINISTRADOR') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card border-0 shadow-lg" style={{borderRadius: '20px'}}>
          <div className="card-header bg-primary text-white text-center py-4" style={{borderRadius: '20px 20px 0 0'}}>
            <h1 className="mb-0 display-6 fw-bold">
              <i className="fas fa-sign-in-alt me-3"></i>
              Iniciar Sesión
            </h1>
            <p className="mb-0 mt-2 opacity-75">Bienvenido de vuelta</p>
          </div>
          <div className="card-body p-5">
            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="fas fa-lock me-2 text-primary"></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                disabled={loading} 
                type="submit" 
                className="btn btn-primary btn-lg w-100 mb-4"
                style={{borderRadius: '10px'}}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Ingresando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Ingresar
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="mb-0 text-muted">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                    Crea una aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
