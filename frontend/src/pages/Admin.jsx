import { useEffect, useState } from 'react';
import { getRegistros, eliminarRegistro, resetMockData, getServicios } from '../lib/api.js';
import ServicioManager from '../components/ServicioManager.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Admin(){
  const [items, setItems] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registroToDelete, setRegistroToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeTab, setActiveTab] = useState('registros');
  const { user } = useAuth();

  const isAdmin = user?.rol === 'ADMINISTRADOR';

  useEffect(()=>{ 
    loadRegistros();
    loadServicios();
  }, []);

  useEffect(() => {
    if (!isAdmin && activeTab !== 'registros') {
      setActiveTab('registros');
    }
  }, [isAdmin, activeTab]);

  const loadServicios = async () => {
    try {
      const data = await getServicios();
      setServicios(data);
    } catch (error) {
      console.error('Error cargando servicios:', error);
    }
  };

  const loadRegistros = async () => {
    setLoading(true);
    try {
      const data = await getRegistros();
      setItems(data);
    } catch (error) {
      console.error('Error cargando registros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (registro) => {
    setRegistroToDelete(registro);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!registroToDelete) return;
    
    try {
      await eliminarRegistro(registroToDelete.id);
      setItems(items.filter(item => item.id !== registroToDelete.id));
      setShowDeleteModal(false);
      setRegistroToDelete(null);
    } catch (error) {
      console.error('Error eliminando registro:', error);
      alert('Error al eliminar el registro');
    }
  };

  const handleResetData = async () => {
    if (confirm('¿Está seguro de resetear todos los datos? Esta acción no se puede deshacer.')) {
      try {
        await resetMockData();
        await loadRegistros();
        alert('Datos reseteados correctamente');
      } catch (error) {
        console.error('Error reseteando datos:', error);
        alert('Error al resetear los datos');
      }
    }
  };

  const exportToExcel = () => {
    // Crear contenido CSV más ordenado y profesional
    const fechaActual = new Date().toLocaleDateString('es-CL');
    const horaActual = new Date().toLocaleTimeString('es-CL');
    
    // Encabezado del reporte
    const reporteHeader = [
      'REPORTE DE REGISTROS - COLITA FELIZ GUARDERÍA CANINA',
      `Fecha de generación: ${fechaActual} ${horaActual}`,
      `Total de registros: ${filteredItems.length}`,
      `Ingresos totales: $${new Intl.NumberFormat('es-CL').format(totalRevenue)}`,
      '', // Línea en blanco
      'DETALLE DE REGISTROS:',
      '' // Línea en blanco
    ];

    // Encabezados de columnas con formato mejorado
    const headers = [
      'ID',
      'Dueño',
      'Email',
      'Teléfono',
      'Mascota',
      'Raza',
      'Peso (kg)',
      'Servicio',
      'Fecha Ingreso',
      'Fecha Salida',
      'Días',
      'Subtotal',
      'Adicional',
      'Total',
      'Comentarios',
      'Fecha Registro'
    ];

    // Datos formateados
    const datosFormateados = filteredItems.map(item => {
      // Obtener nombre del servicio
      const servicio = servicios.find(s => s.id === item.servicio_id);
      const nombreServicio = servicio ? servicio.nombre : item.servicio_id;
      
      return [
        item.id,
        `"${item.dueno}"`,
        `"${item.email || 'No especificado'}"`,
        `"${item.telefono || 'No especificado'}"`,
        `"${item.mascota}"`,
        `"${item.raza || 'No especificado'}"`,
        item.peso ? `${item.peso} kg` : 'No especificado',
        `"${nombreServicio}"`,
        new Date(item.ingreso).toLocaleDateString('es-CL'),
        new Date(item.salida).toLocaleDateString('es-CL'),
        `${item.dias} días`,
        `$${new Intl.NumberFormat('es-CL').format(item.subtotal)}`,
        `$${new Intl.NumberFormat('es-CL').format(item.adicional)}`,
        `$${new Intl.NumberFormat('es-CL').format(item.total)}`,
        `"${item.comentarios || 'Sin comentarios'}"`,
        new Date(item.created_at).toLocaleString('es-CL')
      ];
    });

    // Resumen estadístico
    const resumen = [
      '', // Línea en blanco
      'RESUMEN ESTADÍSTICO:',
      `Total de registros: ${filteredItems.length}`,
      `Ingresos totales: $${new Intl.NumberFormat('es-CL').format(totalRevenue)}`,
      `Promedio por registro: $${new Intl.NumberFormat('es-CL').format(totalRevenue / filteredItems.length || 0)}`,
      `Servicios más utilizados:`,
      ...servicios.map(s => {
        const count = filteredItems.filter(r => r.servicio_id === s.id).length;
        return `  - ${s.nombre}: ${count} registros`;
      }),
      '', // Línea en blanco
      '--- FIN DEL REPORTE ---'
    ];

    // Combinar todo el contenido
    const csvContent = [
      ...reporteHeader,
      headers.join(','),
      ...datosFormateados.map(row => row.join(',')),
      ...resumen
    ].join('\n');

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Reporte_Colita_Feliz_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportReporteEjecutivo = () => {
    const fechaActual = new Date().toLocaleDateString('es-CL');
    const horaActual = new Date().toLocaleTimeString('es-CL');
    
    // Calcular estadísticas
    const totalRegistros = filteredItems.length;
    const ingresosTotales = totalRevenue;
    const promedioPorRegistro = totalRegistros > 0 ? ingresosTotales / totalRegistros : 0;
    
    // Estadísticas por servicio
    const estadisticasServicios = servicios.map(servicio => {
      const registrosServicio = filteredItems.filter(r => r.servicio_id === servicio.id);
      const ingresosServicio = registrosServicio.reduce((sum, r) => sum + r.total, 0);
      return {
        nombre: servicio.nombre,
        cantidad: registrosServicio.length,
        ingresos: ingresosServicio,
        porcentaje: totalRegistros > 0 ? (registrosServicio.length / totalRegistros * 100) : 0
      };
    }).sort((a, b) => b.ingresos - a.ingresos);

    // Estadísticas por mes
    const registrosPorMes = {};
    filteredItems.forEach(registro => {
      const mes = new Date(registro.ingreso).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' });
      if (!registrosPorMes[mes]) {
        registrosPorMes[mes] = { cantidad: 0, ingresos: 0 };
      }
      registrosPorMes[mes].cantidad++;
      registrosPorMes[mes].ingresos += registro.total;
    });

    // Crear contenido del reporte ejecutivo
    const contenido = [
      'REPORTE EJECUTIVO - COLITA FELIZ GUARDERÍA CANINA',
      `Fecha de generación: ${fechaActual} ${horaActual}`,
      '',
      'RESUMEN GENERAL:',
      `• Total de registros: ${totalRegistros}`,
      `• Ingresos totales: $${new Intl.NumberFormat('es-CL').format(ingresosTotales)}`,
      `• Promedio por registro: $${new Intl.NumberFormat('es-CL').format(promedioPorRegistro)}`,
      '',
      'ANÁLISIS POR SERVICIOS:',
      ...estadisticasServicios.map(s => 
        `• ${s.nombre}: ${s.cantidad} registros (${s.porcentaje.toFixed(1)}%) - $${new Intl.NumberFormat('es-CL').format(s.ingresos)}`
      ),
      '',
      'ANÁLISIS POR MES:',
      ...Object.entries(registrosPorMes).map(([mes, datos]) => 
        `• ${mes}: ${datos.cantidad} registros - $${new Intl.NumberFormat('es-CL').format(datos.ingresos)}`
      ),
      '',
      'TOP 5 CLIENTES:',
      ...filteredItems
        .reduce((acc, registro) => {
          const existente = acc.find(c => c.dueno === registro.dueno);
          if (existente) {
            existente.registros++;
            existente.total += registro.total;
          } else {
            acc.push({
              dueno: registro.dueno,
              registros: 1,
              total: registro.total
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
        .map((cliente, index) => 
          `${index + 1}. ${cliente.dueno}: ${cliente.registros} registros - $${new Intl.NumberFormat('es-CL').format(cliente.total)}`
        ),
      '',
      'RECOMENDACIONES:',
      `• Servicio más popular: ${estadisticasServicios[0]?.nombre || 'N/A'}`,
      `• Oportunidad de crecimiento: ${estadisticasServicios[estadisticasServicios.length - 1]?.nombre || 'N/A'}`,
      `• Cliente VIP: ${filteredItems.reduce((acc, r) => {
        const existente = acc.find(c => c.dueno === r.dueno);
        if (existente) {
          existente.total += r.total;
        } else {
          acc.push({ dueno: r.dueno, total: r.total });
        }
        return acc;
      }, []).sort((a, b) => b.total - a.total)[0]?.dueno || 'N/A'}`,
      '',
      '--- FIN DEL REPORTE EJECUTIVO ---'
    ].join('\n');

    // Crear y descargar archivo
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Reporte_Ejecutivo_Colita_Feliz_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredItems = items
    .filter(item => 
      item.dueno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mascota?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const totalRevenue = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const totalRegistros = items.length;
  const columnsCount = isAdmin ? 13 : 12;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando registros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="mb-0">
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Panel de Administración
                  </h1>
                  <p className="mb-0 opacity-75">Gestión completa del sistema</p>
                </div>
                <div className="col-auto">
                  {activeTab === 'registros' && (
                    <>
                      {isAdmin && (
                        <button 
                          className="btn btn-warning me-2" 
                          onClick={handleResetData}
                          title="Resetear datos a estado inicial"
                        >
                          <i className="fas fa-undo me-2"></i>
                          Resetear Datos
                        </button>
                      )}
                      <button 
                        className="btn btn-success me-2" 
                        onClick={exportToExcel}
                        disabled={items.length === 0}
                        title="Exportar reporte detallado a CSV"
                      >
                        <i className="fas fa-file-excel me-2"></i>
                        Exportar Reporte
                      </button>
                      <button 
                        className="btn btn-info me-2" 
                        onClick={exportReporteEjecutivo}
                        disabled={items.length === 0}
                        title="Exportar resumen ejecutivo"
                      >
                        <i className="fas fa-chart-line me-2"></i>
                        Reporte Ejecutivo
                      </button>
                      <button 
                        className="btn btn-light" 
                        onClick={loadRegistros}
                      >
                        <i className="fas fa-sync-alt me-2"></i>
                        Actualizar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Pestañas de navegación */}
            <div className="card-header bg-light border-bottom">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'registros' ? 'active' : ''}`}
                    onClick={() => setActiveTab('registros')}
                  >
                    <i className="fas fa-list me-2"></i>
                    Registros
                  </button>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'servicios' ? 'active' : ''}`}
                      onClick={() => setActiveTab('servicios')}
                    >
                      <i className="fas fa-cogs me-2"></i>
                      Servicios
                    </button>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="card-body p-4">
              {activeTab === 'registros' ? (
                <>
                  {/* Estadísticas */}
                  <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-paw fa-2x mb-2"></i>
                      <h3>{totalRegistros}</h3>
                      <p className="mb-0">Total Registros</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-dollar-sign fa-2x mb-2"></i>
                      <h3>${new Intl.NumberFormat('es-CL').format(totalRevenue)}</h3>
                      <p className="mb-0">Ingresos Totales</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-calendar fa-2x mb-2"></i>
                      <h3>{new Date().toLocaleDateString('es-CL')}</h3>
                      <p className="mb-0">Fecha Actual</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros y búsqueda */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Buscar por dueño, mascota o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <select 
                    className="form-select" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="id">Ordenar por ID</option>
                    <option value="dueno">Ordenar por Dueño</option>
                    <option value="mascota">Ordenar por Mascota</option>
                    <option value="ingreso">Ordenar por Fecha</option>
                    <option value="total">Ordenar por Total</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select 
                    className="form-select" 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                  </select>
                </div>
              </div>

              {/* Tabla de registros */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Dueño</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Mascota</th>
                      <th>Raza</th>
                      <th>Peso</th>
                      <th>Servicio</th>
                      <th>Ingreso</th>
                      <th>Salida</th>
                      <th>Días</th>
                      <th>Total</th>
                      {isAdmin && <th>Acciones</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={columnsCount} className="text-center py-4">
                          <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                          <p className="text-muted">No se encontraron registros</p>
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map(r => (
                        <tr key={r.id}>
                          <td><span className="badge bg-primary">{r.id}</span></td>
                          <td className="fw-bold">{r.dueno}</td>
                          <td>{r.email || '-'}</td>
                          <td>{r.telefono || '-'}</td>
                          <td className="text-primary fw-bold">{r.mascota}</td>
                          <td>{r.raza || '-'}</td>
                          <td>{r.peso ? `${r.peso} kg` : '-'}</td>
                          <td><span className="badge bg-info">{r.servicio_id}</span></td>
                          <td>{new Date(r.ingreso).toLocaleDateString('es-CL')}</td>
                          <td>{new Date(r.salida).toLocaleDateString('es-CL')}</td>
                          <td><span className="badge bg-warning">{r.dias} días</span></td>
                          <td className="fw-bold text-success">${new Intl.NumberFormat('es-CL').format(r.total)}</td>
                          {isAdmin && (
                            <td>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(r)}
                                title="Eliminar registro"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
                </>
              ) : (
                <ServicioManager />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{display: showDeleteModal ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Confirmar Eliminación
              </h5>
            </div>
            <div className="modal-body text-center py-4">
              <i className="fas fa-trash text-danger" style={{fontSize: '3rem'}}></i>
              <h4 className="mt-3 text-danger">¿Está seguro?</h4>
              <p className="text-muted">
                Esta acción eliminará permanentemente el registro de <strong>{registroToDelete?.dueno}</strong> 
                para la mascota <strong>{registroToDelete?.mascota}</strong>.
              </p>
              <p className="text-danger fw-bold">Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setRegistroToDelete(null);
                }}
              >
                <i className="fas fa-times me-2"></i>
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={confirmDelete}
              >
                <i className="fas fa-trash me-2"></i>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop para modal */}
      {showDeleteModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}
