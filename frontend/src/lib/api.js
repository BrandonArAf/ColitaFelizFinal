import mockStore from './mockData.js';

// Configuración del toggle basado en variable de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE;
const USE_BACKEND = !!API_BASE_URL;

// Función para determinar si usar backend o mock
function shouldUseBackend() {
  return USE_BACKEND;
}



function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('cf_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
// Función para hacer peticiones al backend
async function fetchFromBackend(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

// ===== INTERFAZ UNIFICADA =====

// Servicios
export async function getServicios() {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend('/api/servicios');
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.getServicios();
    }
  }
  return await mockStore.getServicios();
}

export async function getServicioById(id) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend(`/api/servicios/${id}`);
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.getServicioById(id);
    }
  }
  return await mockStore.getServicioById(id);
}

export async function createServicio(servicio) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend('/api/servicios', {
        method: 'POST',
        body: JSON.stringify(servicio)
      });
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.createServicio(servicio);
    }
  }
  return await mockStore.createServicio(servicio);
}

export async function updateServicio(id, updates) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend(`/api/servicios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.updateServicio(id, updates);
    }
  }
  return await mockStore.updateServicio(id, updates);
}

export async function deleteServicio(id) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend(`/api/servicios/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.deleteServicio(id);
    }
  }
  return await mockStore.deleteServicio(id);
}

// Registros
export async function getRegistros() {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend('/api/registros');
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.getRegistros();
    }
  }
  return await mockStore.getRegistros();
}

export async function getRegistroById(id) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend(`/api/registros/${id}`);
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.getRegistroById(id);
    }
  }
  return await mockStore.getRegistroById(id);
}

export async function crearRegistro(registro) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend('/api/registros', {
        method: 'POST',
        body: JSON.stringify(registro)
      });
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.createRegistro(registro);
    }
  }
  return await mockStore.createRegistro(registro);
}

export async function updateRegistro(id, updates) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend(`/api/registros/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.updateRegistro(id, updates);
    }
  }
  return await mockStore.updateRegistro(id, updates);
}

export async function eliminarRegistro(id) {
  if (shouldUseBackend()) {
    try {
      return await fetchFromBackend(`/api/registros/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.warn('Error conectando al backend, usando datos simulados:', error.message);
      return await mockStore.deleteRegistro(id);
    }
  }
  return await mockStore.deleteRegistro(id);
}

// Funciones específicas de mock (no disponibles en backend)
export async function getRegistrosByServicio(servicioId) {
  return await mockStore.getRegistrosByServicio(servicioId);
}

export async function getRegistrosByDateRange(fechaInicio, fechaFin) {
  return await mockStore.getRegistrosByDateRange(fechaInicio, fechaFin);
}

export async function resetMockData() {
  return await mockStore.resetData();
}

export async function login(email, password) {
  if (!shouldUseBackend()) {
    throw new Error('Login solo disponible cuando VITE_API_BASE está configurado');
  }

  return await fetchFromBackend('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function register(nombre, email, password) {
  if (!shouldUseBackend()) {
    throw new Error('Registro solo disponible cuando VITE_API_BASE está configurado');
  }

  return await fetchFromBackend('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, email, password })
  });
}

