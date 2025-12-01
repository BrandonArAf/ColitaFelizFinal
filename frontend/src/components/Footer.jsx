export default function Footer(){
  return (
    <footer 
      className="mt-5"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        padding: '50px 0 30px',
        borderTop: '3px solid rgba(102, 126, 234, 0.5)'
      }}
    >
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center">
              <div 
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{width: '40px', height: '40px', fontSize: '1.2rem'}}
              >
                <i className="fas fa-paw"></i>
              </div>
              Colita Feliz
            </h5>
            <p className="text-muted mb-0" style={{lineHeight: '1.7'}}>
              Guardería canina especializada en el cuidado y bienestar de tu mejor amigo. 
              Ofrecemos servicios de calidad con amor y dedicación.
            </p>
          </div>
          
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="fas fa-link me-2"></i>
              Enlaces Rápidos
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-muted text-decoration-none" style={{transition: 'color 0.3s'}}
                   onMouseEnter={(e) => e.target.style.color = 'white'}
                   onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                  <i className="fas fa-home me-2"></i>Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="/servicios" className="text-muted text-decoration-none" style={{transition: 'color 0.3s'}}
                   onMouseEnter={(e) => e.target.style.color = 'white'}
                   onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                  <i className="fas fa-star me-2"></i>Servicios
                </a>
              </li>
              <li className="mb-2">
                <a href="/nosotros" className="text-muted text-decoration-none" style={{transition: 'color 0.3s'}}
                   onMouseEnter={(e) => e.target.style.color = 'white'}
                   onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                  <i className="fas fa-users me-2"></i>Nosotros
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-muted text-decoration-none" style={{transition: 'color 0.3s'}}
                   onMouseEnter={(e) => e.target.style.color = 'white'}
                   onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                  <i className="fas fa-envelope me-2"></i>Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="fas fa-info-circle me-2"></i>
              Información
            </h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <i className="fas fa-clock me-2"></i>
                Lun - Vie: 9:00 - 20:00
              </li>
              <li className="mb-2">
                <i className="fas fa-calendar me-2"></i>
                Sábados: 9:00 - 18:00
              </li>
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Santiago, Chile
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i>
                hola@colitafeliz.cl
              </li>
            </ul>
          </div>
        </div>
        
        <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '30px 0'}} />
        
        <div className="text-center">
          <p className="mb-0 text-muted small">
            © {new Date().getFullYear()} Colita Feliz — Guardería Canina. 
            Todos los derechos reservados.
          </p>
          <p className="mt-2 mb-0">
            <span className="text-muted small">Hecho con</span>{' '}
            <i className="fas fa-heart text-danger" style={{fontSize: '0.8rem'}}></i>{' '}
            <span className="text-muted small">para tu mejor amigo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
