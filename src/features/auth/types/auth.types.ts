export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rolId: number;
}

export interface LoginResponse {
  message: string;
  usuario: Usuario;
}

export interface RegisterResponse {
  message: string;
  usuario: Usuario;
}

export interface AuthErrorResponse {
  error: string;
}

export interface Rol {
  codigo: string;
  nombre: string;
}

export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  permisos: string[];
}


export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  rolId: number;
}
