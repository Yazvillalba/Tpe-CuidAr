# CuidAR - Frontend (React + TypeScript)

Aplicación web React para la gestión de cuidadores, familias y administradores. Desarrollado con React 19, TypeScript, Vite y Bootstrap.

## 🚀 Características

- ✅ Pantalla de login con diseño moderno
- ✅ Autenticación con backend API
- ✅ Dashboard del administrador con estadísticas
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Gestión de roles
- ✅ Carga de imágenes de perfil
- ✅ Protección de rutas
- ✅ Interfaz responsive con Bootstrap
- ✅ Conexión con backend NestJS

## 📋 Requisitos Previos

- *Node.js 18+* y *npm* 
- *Backend corriendo* en http://localhost:3001 (ver [README del Backend](../Tpe-CuidAr-Backend/README.md))

## 🛠️ Instalación y Configuración Local

### 1. Navegar a la carpeta del Frontend

bash
cd "Cuidar Final React/Tpe-CuidAr"


### 2. Instalar dependencias

bash
npm install


### 3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto (Tpe-CuidAr) con el siguiente contenido:

env
# URL del backend API
VITE_API_BASE_URL=http://localhost:3001/api


### 4. Iniciar el servidor de desarrollo

bash
npm run dev


La aplicación estará disponible en http://localhost:5173 (o el puerto que Vite asigne automáticamente)

### 5. Abrir en el navegador

Abre tu navegador y visita:

http://localhost:5173


## 🔐 Credenciales de Prueba

Usa las mismas credenciales que están configuradas en el backend:

- *Admin:* usuario: admin, contraseña: admin123
- *Cuidador:* usuario: cuidador1, contraseña: cuidador123
- *Familia:* usuario: familia1, contraseña: familia123

*Nota:* 
- Los administradores acceden al dashboard con estadísticas y gestión de usuarios
- Los cuidadores y familias acceden a sus respectivas páginas según su rol

## 📁 Estructura del Proyecto


Tpe-CuidAr/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Login.tsx              # Componente de login
│   │   ├── Header.tsx             # Header del administrador
│   │   ├── Dashboard.tsx          # Componente de dashboard con estadísticas
│   │   ├── UserTable.tsx          # Tabla de gestión de usuarios
│   │   ├── CreateUserModal.tsx    # Modal para crear usuario
│   │   ├── EditUserModal.tsx      # Modal para editar usuario
│   │   ├── DeleteUserModal.tsx    # Modal para eliminar usuario
│   │   ├── SolicitudDetailModal.tsx # Modal de detalles
│   │   ├── Toast.tsx              # Componente de notificaciones
│   │   └── ProtectedRoute.tsx     # Protección de rutas
│   ├── contexts/          # Contextos de React
│   │   ├── AuthContext.tsx        # Contexto de autenticación
│   │   └── UsersContext.tsx       # Contexto de usuarios
│   ├── pages/             # Páginas principales
│   │   ├── AdminPage.tsx          # Página principal del admin
│   │   ├── ConstructionPage.tsx   # Página de construcción
│   │   └── WorkerPage.tsx         # Página del trabajador
│   ├── hooks/             # Custom hooks
│   │   └── useToast.ts            # Hook para notificaciones
│   ├── types/             # Tipos TypeScript
│   │   ├── index.ts               # Tipos generales
│   │   └── worker.ts              # Tipos del trabajador
│   ├── utils/             # Utilidades
│   │   └── api.ts                 # Cliente API
│   ├── data/              # Datos estáticos
│   │   └── solicitudes.ts         # Datos de solicitudes
│   ├── App.tsx            # Componente principal con rutas
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── public/                # Archivos estáticos
│   └── Imagenes/          # Imágenes públicas
├── dist/                  # Build de producción (generado)
├── package.json
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
└── index.html             # HTML principal


## 📝 Scripts Disponibles

- npm run dev - Inicia el servidor de desarrollo 
- npm run build - Compila el proyecto para producción
- npm run preview - Previsualiza el build de producción

## 🎨 Tecnologías Utilizadas

- *React 19* - Biblioteca de UI
- *TypeScript* - Tipado estático
- *Vite* - Build tool y dev server
- *React Router DOM* - Enrutamiento
- *Bootstrap 5* - Framework CSS
- *Lucide React* - Iconos
- *dotenv* - Variables de entorno

## 🔄 Flujo de la Aplicación

1. *Login:* El usuario ingresa sus credenciales
2. *Autenticación:* Se valida con el backend API
3. *Dashboard:* Los administradores acceden al dashboard
4. *Gestión:* Se pueden crear, editar, eliminar usuarios
5. *Roles:* Diferentes vistas según el rol del usuario

```

## 🔒 Notas de Seguridad

- Las credenciales se envían al backend, nunca se almacenan en el frontend
- El token de autenticación se guarda en localStorage (solo para desarrollo)

## 📚 Recursos

- [Documentación React](https://react.dev/)
- [Documentación Vite](https://vitejs.dev/)
- [Documentación Bootstrap](https://getbootstrap.com/)
- [Documentación React Router](https://reactrouter.com/)