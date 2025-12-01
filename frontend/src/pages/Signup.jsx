import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const result = await register(form.nombre, form.email, form.password);
      // Redirigir según el rol del usuario (usuarios normales van a home)
      if (result.user.rol === 'ADMINISTRADOR') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-7 col-lg-6">
        <div className="card border-0 shadow-lg" style={{borderRadius: '20px'}}>
          <div className="card-header bg-success text-white text-center py-4" style={{borderRadius: '20px 20px 0 0'}}>
            <h1 className="mb-0 display-6 fw-bold">
              <i className="fas fa-user-plus me-3"></i>
              Crear Cuenta
            </h1>
            <p className="mb-0 mt-2 opacity-75">Únete a nuestra comunidad</p>
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
                  <i className="fas fa-user me-2 text-success"></i>
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="fas fa-envelope me-2 text-success"></i>
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
                  <i className="fas fa-lock me-2 text-success"></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
                <small className="text-muted">La contraseña debe tener al menos 6 caracteres</small>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="fas fa-lock me-2 text-success"></i>
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  required
                  minLength={6}
                />
              </div>

              <button 
                disabled={loading} 
                type="submit" 
                className="btn btn-success btn-lg w-100 mb-4"
                style={{borderRadius: '10px'}}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus me-2"></i>
                    Crear cuenta
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="mb-0 text-muted">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-success fw-bold text-decoration-none">
                    Inicia sesión
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

