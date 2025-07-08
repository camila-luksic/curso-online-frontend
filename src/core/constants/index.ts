// Roles de usuario
export const USER_ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
} as const;

// Estados de carga
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

// Rutas por defecto según rol
export const DEFAULT_ROUTES = {
    [USER_ROLES.ADMIN]: '/admin/dashboard',
    [USER_ROLES.TEACHER]: '/teachers/dashboard',
    [USER_ROLES.STUDENT]: '/students/dashboard',
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
    NOT_FOUND: 'El recurso solicitado no fue encontrado.',
    VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
    SERVER_ERROR: 'Error del servidor. Inténtalo más tarde.',
    UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
} as const;

// Configuración de paginación
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

// Configuración de formularios
export const FORM_CONFIG = {
    DEBOUNCE_DELAY: 300,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
    ],
} as const;
