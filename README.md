# CuidAR - Admin Dashboard

Proyecto React con login y dashboard del administrador. Utiliza autenticación hardcodeada basada en el proyecto original CuidAR.

## Características

- ✅ Pantalla de login con diseño moderno
- ✅ Autenticación hardcodeada (sin backend)
- ✅ Dashboard del administrador con estadísticas
- ✅ Gestión de usuarios con tabla completa
- ✅ Tabs de navegación (Dashboard y Gestión de Usuarios)
- ✅ Botones de acción visibles pero sin funcionalidad (sin modales)
- ✅ Protección de rutas (solo admin puede acceder al dashboard)
- ✅ Página de construcción para cuidadores y familias
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
- **Cuidador:** usuario: `cuidador1`, contraseña: `cuidador123`
- **Familia:** usuario: `familia1`, contraseña: `familia123`

**Nota:** 
- Los administradores acceden al dashboard con estadísticas y gestión de usuarios
- Los cuidadores y familias acceden a una página de construcción

## Estructura del Proyecto

```
cuidar-admin-completo/
├── src/
│   ├── components/
│   │   ├── Login.tsx              # Componente de login
│   │   ├── Header.tsx             # Header del administrador
│   │   ├── Dashboard.tsx          # Componente de dashboard con estadísticas
│   │   ├── UserTable.tsx          # Tabla de gestión de usuarios (sin modales)
│   │   └── ProtectedRoute.tsx    # Protección de rutas
│   ├── contexts/
│   │   └── AuthContext.tsx       # Contexto de autenticación con datos hardcodeados
│   ├── pages/
│   │   ├── AdminPage.tsx          # Página principal del admin con tabs
│   │   └── ConstructionPage.tsx  # Página de construcción para cuidadores/familias
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
- Tabla completa con todos los usuarios
- Muestra: foto de perfil, nombre, email, rol y estado
- Botones de acción visibles:
  - **Crear Usuario** (no funcional)
  - **Editar** (no funcional)
  - **Eliminar** (no funcional)
  - **Cambiar Estado** (no funcional)

**Nota:** Los botones están presentes pero no tienen funcionalidad. No hay modales implementados.

## Tecnologías Utilizadas

- React 19
- TypeScript
- Vite
- React Router DOM
- Bootstrap 5
- Lucide React (iconos)

## Notas

- Este proyecto es solo frontend, no requiere backend
- Los datos de usuario están hardcodeados en `AuthContext.tsx` y `UserTable.tsx`
- Solo los administradores pueden acceder al dashboard después del login
- Los cuidadores y familias son redirigidos a una página de construcción
- La sesión se guarda en localStorage
- Los botones de gestión de usuarios están presentes pero no tienen funcionalidad
