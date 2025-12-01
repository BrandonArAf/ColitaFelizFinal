export default function Contacto(){
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
                <i className="fas fa-envelope me-3" style={{color: '#10b981'}}></i>
                Contáctanos
              </h1>
              <p className="lead fs-5" style={{color: '#047857', fontWeight: '500', maxWidth: '600px', margin: '0 auto'}}>
                Estamos aquí para ayudarte y responder todas tus preguntas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-lg h-100" style={{borderRadius: '20px'}}>
            <div className="card-body text-center p-5">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                   style={{width: '100px', height: '100px'}}>
                <i className="fas fa-envelope fa-3x"></i>
              </div>
              <h3 className="mb-3 text-primary">Email</h3>
              <p className="text-muted fs-5 mb-4">
                Escríbenos y te responderemos lo antes posible
              </p>
              <a 
                href="mailto:hola@colitafeliz.cl" 
                className="btn btn-primary btn-lg"
                style={{borderRadius: '10px'}}
              >
                <i className="fas fa-paper-plane me-2"></i>
                hola@colitafeliz.cl
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-lg h-100" style={{borderRadius: '20px'}}>
            <div className="card-body text-center p-5">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                   style={{width: '100px', height: '100px'}}>
                <i className="fab fa-whatsapp fa-3x"></i>
              </div>
              <h3 className="mb-3 text-success">WhatsApp</h3>
              <p className="text-muted fs-5 mb-4">
                Chatea con nosotros directamente por WhatsApp
              </p>
              <a 
                href="https://wa.me/56912345678" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg"
                style={{borderRadius: '10px'}}
              >
                <i className="fab fa-whatsapp me-2"></i>
                Enviar Mensaje
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow" style={{borderRadius: '15px'}}>
            <div className="card-body p-4">
              <div className="row text-center">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <i className="fas fa-clock fa-2x text-primary mb-2"></i>
                  <h5 className="mb-2">Horario de Atención</h5>
                  <p className="text-muted mb-0">Lunes a Viernes: 9:00 - 20:00<br/>Sábados: 9:00 - 18:00</p>
                </div>
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <i className="fas fa-map-marker-alt fa-2x text-success mb-2"></i>
                  <h5 className="mb-2">Ubicación</h5>
                  <p className="text-muted mb-0">Santiago, Chile<br/>Visítanos cuando quieras</p>
                </div>
                <div className="col-12 col-md-4">
                  <i className="fas fa-phone fa-2x text-warning mb-2"></i>
                  <h5 className="mb-2">Respuesta Rápida</h5>
                  <p className="text-muted mb-0">Te respondemos en menos de 24 horas<br/>Estamos aquí para ayudarte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
