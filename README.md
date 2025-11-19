# CuidAR - Admin Dashboard

Proyecto React con login y dashboard del administrador. Utiliza autenticación hardcodeada basada en el proyecto original CuidAR.

## Características

- ✅ Pantalla de login con diseño moderno
- ✅ Autenticación hardcodeada (sin backend)
- ✅ Dashboard del administrador con estadísticas
- ✅ Tabs de navegación (Dashboard y Gestión de Usuarios)
- ✅ Página de construcción para Gestión de Usuarios
- ✅ Protección de rutas (solo admin puede acceder)
- ✅ Estilos consistentes con el proyecto original

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

3. Abrir en el navegador: `http://localhost:5173`

## Credenciales de Prueba

- **Admin:** usuario: `admin`, contraseña: `admin123`

**Nota:** Solo los usuarios con rol `admin` pueden acceder a esta aplicación.

## Estructura del Proyecto

```
cuidar-admin-dashboard/
├── src/
│   ├── components/
│   │   ├── Login.tsx              # Componente de login
│   │   ├── Header.tsx             # Header del administrador
│   │   ├── Dashboard.tsx           # Componente de dashboard con estadísticas
│   │   └── ProtectedRoute.tsx     # Protección de rutas
│   ├── contexts/
│   │   └── AuthContext.tsx        # Contexto de autenticación con datos hardcodeados
│   ├── pages/
│   │   ├── AdminPage.tsx          # Página principal del admin con tabs
│   │   └── UsersConstructionPage.tsx # Página de construcción para gestión de usuarios
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript
│   ├── App.tsx                    # Componente principal con rutas
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── package.json
├── vite.config.ts
└── README.md
```

## Funcionalidades

### Dashboard
- Muestra estadísticas de usuarios:
  - Total Usuarios
  - Cuidadores
  - Familias
  - Usuarios Activos

### Gestión de Usuarios
- Actualmente muestra "Sitio en Construcción"
- Se puede expandir en el futuro para gestionar usuarios

## Tecnologías Utilizadas

- React 19
- TypeScript
- Vite
- React Router DOM
- Bootstrap 5
- Lucide React (iconos)

## Notas

- Este proyecto es solo frontend, no requiere backend
- Los datos de usuario están hardcodeados en `AuthContext.tsx`
- Solo los administradores pueden acceder después del login
- Después del login exitoso, se redirige a `/admin`
- La sesión se guarda en localStorage

