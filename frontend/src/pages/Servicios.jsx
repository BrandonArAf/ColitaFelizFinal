import { useEffect, useState } from 'react';
import { getServicios } from '../lib/api.js';
import ServicioCard from '../components/ServicioCard.jsx';

export default function Servicios(){
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
          <div className="card border-0 shadow-lg position-relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
            borderRadius: '30px',
            boxShadow: '0 25px 80px rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.1)'
          }}>
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
            <div className="card-body text-center py-5 position-relative" style={{zIndex: 1}}>
              <h1 className="display-3 fw-bold mb-3" style={{
                color: '#065f46',
                letterSpacing: '-0.5px'
              }}>
                <i className="fas fa-star me-3" style={{color: '#f59e0b'}}></i>
                Nuestros Servicios
              </h1>
              <p className="lead fs-5 mb-0" style={{color: '#047857', fontWeight: '500', maxWidth: '600px', margin: '0 auto'}}>
                Ofrecemos una variedad de servicios para el cuidado y bienestar de tu mascota
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios Grid */}
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
      {items.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-success text-white border-0 shadow">
              <div className="card-body text-center py-4">
                <h3 className="mb-3">
                  <i className="fas fa-paw me-2"></i>
                  ¿Listo para reservar un servicio?
                </h3>
                <p className="lead mb-4">
                  Regístrate ahora y dale a tu mejor amigo el cuidado que se merece
                </p>
                <a href="/registro" className="btn btn-warning btn-lg px-5">
                  <i className="fas fa-calendar-check me-2"></i>
                  Registrar Mascota
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
