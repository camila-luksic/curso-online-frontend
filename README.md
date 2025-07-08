# Plataforma de Cursos Online - Frontend

Aplicación web para gestión de cursos online desarrollada con React, TypeScript y Vite.

## Tecnologías

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **TanStack Query** para gestión de estado
- **React Hook Form** + **Zod** para formularios

## Instalación

```bash
# Clonar e instalar
git clone <repository-url>
cd curso-online-frontend
yarn install

# Configurar variables de entorno
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env

# Ejecutar
yarn dev
```

## Estructura

```
src/
├── app/routes.tsx          # Rutas de la aplicación
├── core/                   # Componentes y utilidades core
├── features/               # Funcionalidades por módulo
│   ├── auth/              # Autenticación
│   ├── courses/           # Cursos
│   ├── users/             # Usuarios
│   └── videos/            # Videos
├── layouts/               # Layouts por rol
└── providers/             # Providers de contexto
```


## Scripts

```bash
yarn dev      # Desarrollo
yarn build    # Producción
yarn lint     # Linting
```
