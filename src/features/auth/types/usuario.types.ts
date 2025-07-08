export interface Rol {
    id: number;
    codigo: string;
    nombre: string;
}

export interface Usuario {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    rol: Rol;
}
