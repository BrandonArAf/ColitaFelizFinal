export default function Nosotros(){
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
                <i className="fas fa-heart me-3" style={{color: '#ef4444'}}></i>
                Sobre Nosotros
              </h1>
              <p className="lead fs-5" style={{color: '#047857', fontWeight: '500', maxWidth: '600px', margin: '0 auto'}}>
                Un equipo apasionado por el cuidado y bienestar de tu mejor amigo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow h-100" style={{borderRadius: '15px'}}>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-paw fa-3x"></i>
                </div>
              </div>
              <h3 className="text-center text-primary mb-3">Nuestra Misión</h3>
              <p className="text-center text-muted fs-5">
                Somos un equipo amante de los perritos. Cuidamos, jugamos y paseamos con responsabilidad, 
                brindando el mejor servicio para tu mascota.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card border-0 shadow h-100" style={{borderRadius: '15px'}}>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-heart fa-3x"></i>
                </div>
              </div>
              <h3 className="text-center text-success mb-3">Nuestros Valores</h3>
              <ul className="list-unstyled text-muted fs-5">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Amor y respeto por los animales
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Profesionalismo y dedicación
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Cuidado responsable y seguro
                </li>
                <li>
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Transparencia y confianza
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow text-center h-100" style={{borderRadius: '15px'}}>
            <div className="card-body p-4">
              <i className="fas fa-users fa-3x text-primary mb-3"></i>
              <h4 className="mb-3">Equipo Profesional</h4>
              <p className="text-muted">
                Contamos con personal capacitado y apasionado por el cuidado animal
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow text-center h-100" style={{borderRadius: '15px'}}>
            <div className="card-body p-4">
              <i className="fas fa-shield-alt fa-3x text-success mb-3"></i>
              <h4 className="mb-3">Seguridad Garantizada</h4>
              <p className="text-muted">
                Instalaciones seguras y supervisión constante de tu mascota
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow text-center h-100" style={{borderRadius: '15px'}}>
            <div className="card-body p-4">
              <i className="fas fa-smile fa-3x text-warning mb-3"></i>
              <h4 className="mb-3">Experiencia Feliz</h4>
              <p className="text-muted">
                Tu mascota disfrutará de juegos, paseos y mucho cariño
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
