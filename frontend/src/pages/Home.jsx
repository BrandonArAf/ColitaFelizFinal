import { useEffect, useState } from 'react';
import { getServicios } from '../lib/api.js';
import ServicioCard from '../components/ServicioCard.jsx';

export default function Home(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{ 
    (async()=> {
      try {
        const servicios = await getServicios();
        setItems(servicios);
      } catch (error) {
        console.error('Error cargando servicios:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div 
            className="card border-0 position-relative overflow-hidden" 
            style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
              borderRadius: '30px',
              boxShadow: '0 25px 80px rgba(16, 185, 129, 0.15)',
              minHeight: '450px',
              border: '1px solid rgba(16, 185, 129, 0.1)'
            }}
          >
            {/* Decorative elements */}
            <div 
              className="position-absolute"
              style={{
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}
            ></div>
            <div 
              className="position-absolute"
              style={{
                bottom: '-30px',
                left: '-30px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, transparent 70%)',
                borderRadius: '50%'
              }}
            ></div>
            
            <div className="card-body py-5 px-4 px-md-5 position-relative" style={{zIndex: 1}}>
              <div className="text-center mb-5">
                <h1 
                  className="display-3 fw-bold mb-4"
                  style={{
                    color: '#065f46',
                    letterSpacing: '-0.5px',
                    lineHeight: '1.2'
                  }}
                >
                  Bienvenid@ a{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Colita Feliz</span>
                </h1>
                <p 
                  className="lead fs-5 mb-0"
                  style={{
                    color: '#047857',
                    fontWeight: '500',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}
                >
                  Guardería canina con juegos, paseos y cuidado amoroso para tu mejor amigo
                </p>
              </div>
              
              <div className="row g-4 justify-content-center mt-5">
                <div className="col-md-4">
                  <div 
                    className="card border-0 h-100"
                    style={{
                      background: 'white',
                      borderRadius: '20px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      padding: '30px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)'
                      }}
                    >
                      <i className="fas fa-paw fa-2x" style={{color: '#f59e0b'}}></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{color: '#064e3b', fontSize: '1.3rem'}}>Cuidado Especializado</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6', fontSize: '0.95rem'}}>
                      Profesionales dedicados al bienestar de tu mascota
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div 
                    className="card border-0 h-100"
                    style={{
                      background: 'white',
                      borderRadius: '20px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      padding: '30px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.25)'
                      }}
                    >
                      <i className="fas fa-gamepad fa-2x" style={{color: '#3b82f6'}}></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{color: '#064e3b', fontSize: '1.3rem'}}>Juegos y Entretenimiento</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6', fontSize: '0.95rem'}}>
                      Actividades divertidas para mantener a tu mascota activa
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div 
                    className="card border-0 h-100"
                    style={{
                      background: 'white',
                      borderRadius: '20px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      padding: '30px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                        boxShadow: '0 8px 20px rgba(236, 72, 153, 0.25)'
                      }}
                    >
                      <i className="fas fa-walking fa-2x" style={{color: '#ec4899'}}></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{color: '#064e3b', fontSize: '1.3rem'}}>Paseos Diarios</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6', fontSize: '0.95rem'}}>
                      Ejercicio regular para la salud física y mental
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios Section */}
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-4" style={{color: '#064e3b', letterSpacing: '-0.5px'}}>
              <i className="fas fa-star me-3" style={{color: '#f59e0b'}}></i>
              Nuestros Servicios
            </h2>
            <p className="lead text-muted fs-5" style={{maxWidth: '600px', margin: '0 auto', color: '#6b7280'}}>
              Ofrecemos una variedad de servicios para el cuidado y bienestar de tu mascota
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 fs-5">Cargando servicios...</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {items.map(s => (
            <div key={s.id} className="col-12 col-sm-6 col-lg-4">
              <ServicioCard s={s} />
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="row mt-5">
        <div className="col-12">
          <div 
            className="card border-0 position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              borderRadius: '30px',
              boxShadow: '0 25px 80px rgba(16, 185, 129, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div 
              className="position-absolute"
              style={{
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                borderRadius: '50%'
              }}
            ></div>
            <div className="card-body text-center py-5 px-4 position-relative" style={{zIndex: 1}}>
              <h3 className="mb-4 fw-bold text-white" style={{fontSize: '2.5rem', letterSpacing: '-0.5px'}}>
                <i className="fas fa-heart me-2" style={{color: '#fef3c7'}}></i>
                ¿Listo para darle lo mejor a tu mascota?
              </h3>
              <p className="lead mb-5 fs-5 text-white" style={{opacity: 0.95, maxWidth: '600px', margin: '0 auto'}}>
                Regístrate ahora y dale a tu mejor amigo el cuidado que se merece
              </p>
              <a 
                href="/registro" 
                className="btn btn-lg px-5 fw-bold text-white"
                style={{
                  background: 'white',
                  color: '#10b981',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  padding: '16px 40px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.background = '#fef3c7';
                  e.currentTarget.style.color = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#10b981';
                }}
              >
                <i className="fas fa-paw me-2"></i>
                Registrar Mascota
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
