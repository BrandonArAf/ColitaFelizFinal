import { useNavigate } from 'react-router-dom';

export default function ServicioCard({ s }){
  const navigate = useNavigate();
  const fmt = new Intl.NumberFormat('es-CL');
  
  const handleReservar = () => {
    navigate('/registro', { state: { servicioId: s.id } });
  };
  
  const getServiceIcon = (nombre) => {
    const name = nombre.toLowerCase();
    if (name.includes('guardería') || name.includes('guarderia')) return 'fas fa-home';
    if (name.includes('paseo') || name.includes('walking')) return 'fas fa-walking';
    if (name.includes('juego') || name.includes('play')) return 'fas fa-gamepad';
    if (name.includes('baño') || name.includes('bano')) return 'fas fa-shower';
    if (name.includes('veterinario') || name.includes('vet')) return 'fas fa-stethoscope';
    return 'fas fa-paw';
  };

  const getServiceColor = (nombre) => {
    const name = nombre.toLowerCase();
    if (name.includes('guardería') || name.includes('guarderia')) return 'primary';
    if (name.includes('paseo') || name.includes('walking')) return 'success';
    if (name.includes('juego') || name.includes('play')) return 'warning';
    if (name.includes('baño') || name.includes('bano')) return 'info';
    if (name.includes('veterinario') || name.includes('vet')) return 'danger';
    return 'secondary';
  };

  const icon = getServiceIcon(s.nombre);
  const color = getServiceColor(s.nombre);

  return (
    <div 
      className="card h-100 border-0 position-relative overflow-hidden" 
      style={{
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      }}
    >
      {/* Decorative gradient overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100"
        style={{
          height: '5px',
          background: `linear-gradient(90deg, var(--bs-${color}), var(--bs-${color}-bg-subtle))`,
          opacity: 0.8
        }}
      ></div>
      
      <div className="card-header border-0 pb-0" style={{background: 'transparent'}}>
        <div className="d-flex align-items-center">
          <div 
            className={`bg-${color} text-white rounded-circle d-flex align-items-center justify-content-center me-3`}
            style={{
              width: '70px',
              height: '70px',
              fontSize: '1.8rem',
              boxShadow: `0 8px 20px rgba(var(--bs-${color}-rgb), 0.4)`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0) scale(1)';
            }}
          >
            <i className={icon}></i>
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title mb-1 text-primary fw-bold fs-5">{s.nombre}</h5>
            <small className="text-muted d-flex align-items-center">
              <i className="fas fa-star text-warning me-1" style={{fontSize: '0.7rem'}}></i>
              Servicio especializado
            </small>
          </div>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column pt-3">
        <p className="card-text text-muted mb-4" style={{lineHeight: '1.7', fontSize: '0.95rem'}}>
          {s.descripcion}
        </p>
        
        <div className="mt-auto">
          <div 
            className="row text-center mb-4 p-3 rounded"
            style={{
              background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(25, 135, 84, 0.05) 100%)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div className="col-6">
              <div className="border-end border-2">
                <div className="fw-bold text-success mb-1" style={{fontSize: '1.8rem'}}>
                  ${fmt.format(s.precioDia)}
                </div>
                <small className="text-muted d-block">por día</small>
              </div>
            </div>
            <div className="col-6">
              {s.adicional ? (
                <>
                  <div className="fw-bold text-info mb-1" style={{fontSize: '1.3rem'}}>
                    +${fmt.format(s.adicional)}
                  </div>
                  <small className="text-muted d-block">adicional</small>
                </>
              ) : (
                <>
                  <div className="fw-bold text-muted mb-1" style={{fontSize: '1.3rem'}}>-</div>
                  <small className="text-muted d-block">sin adicional</small>
                </>
              )}
            </div>
          </div>
          
          <div className="d-grid">
            <button 
              className={`btn btn-${color} btn-lg text-white fw-bold`}
              onClick={handleReservar}
              style={{
                borderRadius: '12px',
                padding: '14px',
                fontSize: '1.05rem',
                boxShadow: `0 6px 20px rgba(var(--bs-${color}-rgb), 0.3)`,
                transition: 'all 0.3s ease',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(var(--bs-${color}-rgb), 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 6px 20px rgba(var(--bs-${color}-rgb), 0.3)`;
              }}
            >
              <i className="fas fa-calendar-plus me-2"></i>
              Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
