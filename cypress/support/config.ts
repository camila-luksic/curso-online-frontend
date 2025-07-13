// Configuración para Cypress
export const config = {
  // URL base de la aplicación frontend
  baseUrl: 'http://localhost:5173',
  
  // URL base de la API - AJUSTA ESTO SEGÚN TU CONFIGURACIÓN
  // Según el README del proyecto: VITE_API_BASE_URL=http://localhost:3000/api
  // Los endpoints son: /api/auth/login, /api/usuarios/me, etc.
  apiUrl: 'http://localhost:3000',
  
  // Timeouts
  timeouts: {
    default: 10000,
    short: 5000,
    long: 30000
  }
};

// Datos de prueba
export const testData = {
  users: {
    admin: {
      email: 'admin@test.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'ADMIN'
    },
    profesor: {
      email: 'profesor@test.com',
      password: 'profesor123',
      name: 'Juan',
      role: 'PROF'
    },
    estudiante: {
      email: 'estudiante@test.com',
      password: 'estudiante123',
      name: 'María',
      role: 'EST'
    }
  }
}; 