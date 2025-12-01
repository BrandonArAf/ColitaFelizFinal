// backend/src/swaggerDoc.js

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Colita Feliz - API REST',
    version: '1.0.0',
    description:
      'API REST para la gestión de servicios, registros y usuarios de la guardería canina "Colita Feliz".'
  },
  servers: [
    {
      url: 'http://localhost:4001',
      description: 'Servidor local de desarrollo'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Servicio: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'pension-diurna' },
          nombre: { type: 'string', example: 'Pensión Diurna' },
          descripcion: { type: 'string', example: 'Cuidado diurno para perros.' },
          precioDia: { type: 'integer', example: 15000 },
          adicional: { type: 'integer', example: 3000 }
        },
        required: ['id', 'nombre', 'precioDia']
      },
      Registro: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          dueno: { type: 'string', example: 'Juan Pérez' },
          email: { type: 'string', example: 'juan@example.com' },
          telefono: { type: 'string', example: '+56 9 1234 5678' },
          mascota: { type: 'string', example: 'Firulais' },
          raza: { type: 'string', example: 'Labrador' },
          peso: { type: 'number', format: 'float', example: 18.5 },
          servicio_id: { type: 'string', example: 'pension-diurna' },
          ingreso: { type: 'string', format: 'date', example: '2025-11-01' },
          salida: { type: 'string', format: 'date', example: '2025-11-05' },
          dias: { type: 'integer', example: 4 },
          subtotal: { type: 'integer', example: 60000 },
          adicional: { type: 'integer', example: 3000 },
          total: { type: 'integer', example: 63000 },
          comentarios: { type: 'string', example: 'Perro nervioso los primeros días.' }
        },
        required: ['dueno', 'mascota', 'servicio_id', 'ingreso', 'salida']
      },
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Administrador' },
          email: { type: 'string', example: 'admin@colitafeliz.com' },
          rol: {
            type: 'string',
            description: 'Rol del usuario dentro del sistema',
            example: 'ADMINISTRADOR',
            enum: ['ADMINISTRADOR', 'VENDEDOR', 'CLIENTE']
          }
        }
      },
      LoginRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'admin@colitafeliz.com' },
          password: { type: 'string', example: 'admin123' }
        },
        required: ['email', 'password']
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/Usuario' }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Mensaje de error' }
        }
      }
    }
  },
  paths: {
    '/api/servicios': {
      get: {
        tags: ['Servicios'],
        summary: 'Listar servicios',
        description: 'Obtiene el listado completo de servicios disponibles. Endpoint público.',
        security: [],
        responses: {
          200: {
            description: 'Listado de servicios',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Servicio' }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Servicios'],
        summary: 'Crear servicio',
        description: 'Crea un nuevo servicio. Requiere rol ADMINISTRADOR.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Servicio' }
            }
          }
        },
        responses: {
          201: {
            description: 'Servicio creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Servicio' }
              }
            }
          },
          400: { 
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          401: { 
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/servicios/{id}': {
      get: {
        tags: ['Servicios'],
        summary: 'Obtener servicio por ID',
        description: 'Obtiene un servicio específico por su ID. Endpoint público.',
        security: [],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID del servicio'
          }
        ],
        responses: {
          200: {
            description: 'Servicio encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Servicio' }
              }
            }
          },
          404: { 
            description: 'Servicio no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Servicios'],
        summary: 'Actualizar servicio',
        description: 'Actualiza un servicio existente. Requiere rol ADMINISTRADOR.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID del servicio'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Servicio' }
            }
          }
        },
        responses: {
          200: { 
            description: 'Servicio actualizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Servicio' }
              }
            }
          },
          400: { 
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          404: { 
            description: 'Servicio no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          401: { 
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Servicios'],
        summary: 'Eliminar servicio',
        description: 'Elimina un servicio. Requiere rol ADMINISTRADOR.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'ID del servicio'
          }
        ],
        responses: {
          204: { description: 'Servicio eliminado' },
          404: { 
            description: 'Servicio no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          401: { 
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/registros': {
      get: {
        tags: ['Registros'],
        summary: 'Listar registros',
        description: 'Obtiene el listado completo de registros. Requiere rol ADMINISTRADOR.',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Listado de registros',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Registro' }
                }
              }
            }
          },
          401: { 
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Registros'],
        summary: 'Crear registro',
        description: 'Crea un nuevo registro de mascota. Requiere rol ADMINISTRADOR.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Registro' }
            }
          }
        },
        responses: {
          201: { 
            description: 'Registro creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Registro' }
              }
            }
          },
          400: { 
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          401: { 
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/registros/{id}': {
      delete: {
        tags: ['Registros'],
        summary: 'Eliminar registro',
        description: 'Elimina un registro de mascota. Requiere rol ADMINISTRADOR.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID del registro'
          }
        ],
        responses: {
          204: { description: 'Registro eliminado' },
          404: { 
            description: 'Registro no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          401: { 
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login de usuario',
        description: 'Autentica un usuario y devuelve un token JWT.',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' }
            }
          }
        },
        responses: {
          200: {
            description: 'Login correcto',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' }
              }
            }
          },
          401: { 
            description: 'Credenciales inválidas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registro de nuevo usuario',
        description: 'Registra un nuevo usuario en el sistema.',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', example: 'Nuevo Usuario' },
                  email: { type: 'string', example: 'usuario@colitafeliz.com' },
                  password: { type: 'string', example: 'password123' },
                  rol: { type: 'string', enum: ['ADMINISTRADOR', 'VENDEDOR', 'CLIENTE'], example: 'VENDEDOR' }
                },
                required: ['nombre', 'email', 'password']
              }
            }
          }
        },
        responses: {
          201: { 
            description: 'Usuario creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Usuario' }
              }
            }
          },
          400: { 
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDocument;

