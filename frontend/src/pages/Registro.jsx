import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getServicios, crearRegistro } from '../lib/api.js';

export default function Registro(){
  const location = useLocation();
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    dueno:'', email:'', telefono:'',
    mascota:'', raza:'', peso:'',
    servicio_id:'', ingreso:'', salida:'', dias:1,
    subtotal:0, adicional:0, total:0, comentarios:''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fmt = useMemo(()=> new Intl.NumberFormat('es-CL'), []);

  useEffect(()=>{ 
    (async()=> {
      const serviciosData = await getServicios();
      setServicios(serviciosData);
      
      // Si viene un servicioId desde el state, seleccionarlo automáticamente
      if (location.state?.servicioId) {
        const servicioId = location.state.servicioId;
        if (serviciosData.find(s => s.id === servicioId)) {
          setForm(prev => ({ ...prev, servicio_id: servicioId }));
        }
      }
    })();
  }, [location.state]);

  useEffect(()=>{
    if(!form.servicio_id || !form.ingreso || !form.salida) return;
    const svc = servicios.find(s=>s.id===form.servicio_id);
    if(!svc) return;
    const inDate = new Date(form.ingreso);
    const outDate = new Date(form.salida);
    const dias = Math.max(1, Math.ceil((outDate - inDate)/86400000));
    const subtotal = dias * (svc.precioDia||0);
    const adicional = svc.adicional||0;
    const total = subtotal + adicional;
    setForm(f => ({...f, dias, subtotal, adicional, total}));
  }, [form.servicio_id, form.ingreso, form.salida, servicios]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const requiredFields = ['dueno', 'mascota', 'servicio_id', 'ingreso', 'salida'];
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      setErrorMessage(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
      setShowErrorModal(true);
      return false;
    }

    if (form.telefono && form.telefono.length !== 9) {
      setErrorMessage('El teléfono debe tener exactamente 9 números');
      setShowErrorModal(true);
      return false;
    }

    if (form.email && !form.email.includes('@')) {
      setErrorMessage('El email debe tener un formato válido');
      setShowErrorModal(true);
      return false;
    }

    return true;
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await crearRegistro(form);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage('Error al enviar el registro. Intente nuevamente.');
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h1 className="mb-0 text-center">
                <i className="fas fa-paw me-2"></i>
                Registro de Mascota
              </h1>
              <p className="text-center mb-0 opacity-75">Complete todos los campos obligatorios</p>
            </div>
            <div className="card-body p-4">
              <form className="row g-4" onSubmit={onSubmit}>
                <div className="col-12">
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-user me-2"></i>
                    Información del Dueño
                  </h5>
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Nombre del Dueño <span className="text-danger">*</span>
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    name="dueno" 
                    value={form.dueno} 
                    onChange={onChange} 
                    placeholder="Ingrese su nombre completo"
                    required 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email</label>
                  <input 
                    className="form-control form-control-lg" 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={onChange}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Teléfono <span className="text-danger">*</span>
                    <small className="text-muted d-block">(9 números exactos)</small>
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    name="telefono" 
                    value={form.telefono} 
                    onChange={onChange}
                    placeholder="912345678"
                    maxLength="9"
                    pattern="[0-9]{9}"
                    required
                  />
                </div>

                <div className="col-12">
                  <hr className="my-4" />
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-dog me-2"></i>
                    Información de la Mascota
                  </h5>
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Nombre Mascota <span className="text-danger">*</span>
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    name="mascota" 
                    value={form.mascota} 
                    onChange={onChange}
                    placeholder="Nombre de su mascota"
                    required 
                  />
                </div>
                
                <div className="col-md-4">
                  <label className="form-label fw-bold">Raza</label>
                  <input 
                    className="form-control form-control-lg" 
                    name="raza" 
                    value={form.raza} 
                    onChange={onChange}
                    placeholder="Raza de la mascota"
                  />
                </div>
                
                <div className="col-md-2">
                  <label className="form-label fw-bold">Peso (kg)</label>
                  <input 
                    className="form-control form-control-lg" 
                    name="peso" 
                    value={form.peso} 
                    onChange={onChange}
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                  />
                </div>

                <div className="col-12">
                  <hr className="my-4" />
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Servicio y Fechas
                  </h5>
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Servicio <span className="text-danger">*</span>
                  </label>
                  <select className="form-select form-select-lg" name="servicio_id" value={form.servicio_id} onChange={onChange} required>
                    <option value="">Seleccione un servicio…</option>
                    {servicios.map(s=>(<option key={s.id} value={s.id}>{s.nombre}</option>))}
                  </select>
                </div>
                
                <div className="col-md-3">
                  <label className="form-label fw-bold">
                    Fecha Ingreso <span className="text-danger">*</span>
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    type="date" 
                    name="ingreso" 
                    value={form.ingreso} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                
                <div className="col-md-3">
                  <label className="form-label fw-bold">
                    Fecha Salida <span className="text-danger">*</span>
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    type="date" 
                    name="salida" 
                    value={form.salida} 
                    onChange={onChange} 
                    required 
                  />
                </div>

                <div className="col-12">
                  <div className="card bg-light border-primary">
                    <div className="card-header bg-primary text-white">
                      <h6 className="mb-0">
                        <i className="fas fa-calculator me-2"></i>
                        Resumen de Costos
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row text-center">
                        <div className="col-3">
                          <div className="fw-bold text-primary">Días</div>
                          <div className="h5">{form.dias}</div>
                        </div>
                        <div className="col-3">
                          <div className="fw-bold text-primary">Subtotal</div>
                          <div className="h5">${fmt.format(form.subtotal)}</div>
                        </div>
                        <div className="col-3">
                          <div className="fw-bold text-primary">Adicional</div>
                          <div className="h5">${fmt.format(form.adicional)}</div>
                        </div>
                        <div className="col-3">
                          <div className="fw-bold text-success">Total</div>
                          <div className="h4 text-success">${fmt.format(form.total)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="fas fa-comment me-2"></i>
                    Comentarios Adicionales
                  </label>
                  <textarea 
                    className="form-control" 
                    name="comentarios" 
                    value={form.comentarios} 
                    onChange={onChange} 
                    rows="4"
                    placeholder="Información adicional sobre su mascota..."
                  ></textarea>
                </div>

                <div className="col-12 text-center">
                  <button 
                    className="btn btn-success btn-lg px-5" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Enviar Registro
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Éxito */}
      <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} style={{display: showSuccessModal ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">
                <i className="fas fa-check-circle me-2"></i>
                ¡Registro Exitoso!
              </h5>
            </div>
            <div className="modal-body text-center py-4">
              <i className="fas fa-heart text-success" style={{fontSize: '3rem'}}></i>
              <h4 className="mt-3 text-success">¡Gracias por confiar en nosotros!</h4>
              <p className="text-muted">Su registro ha sido enviado correctamente. Nos pondremos en contacto pronto.</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-success" 
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = '/admin';
                }}
              >
                <i className="fas fa-eye me-2"></i>
                Ver Registros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Error */}
      <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{display: showErrorModal ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Error en el Registro
              </h5>
            </div>
            <div className="modal-body text-center py-4">
              <i className="fas fa-times-circle text-danger" style={{fontSize: '3rem'}}></i>
              <h4 className="mt-3 text-danger">¡Ups! Algo salió mal</h4>
              <p className="text-muted">{errorMessage}</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={() => setShowErrorModal(false)}
              >
                <i className="fas fa-edit me-2"></i>
                Corregir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop para modales */}
      {(showSuccessModal || showErrorModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}
