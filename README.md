# CuidAR - Login Simple

Proyecto React con solo la pantalla de login y una página de construcción. Utiliza autenticación hardcodeada basada en el proyecto original CuidAR.

## Características

- ✅ Pantalla de login con diseño moderno
- ✅ Autenticación hardcodeada (sin backend)
- ✅ Redirección a página de construcción después del login
- ✅ Protección de rutas
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

## Estructura del Proyecto

```
cuidar/
├── src/
│   ├── components/
│   │   ├── Login.tsx          # Componente de login
│   │   └── ProtectedRoute.tsx # Protección de rutas
│   ├── contexts/
│   │   └── AuthContext.tsx     # Contexto de autenticación con datos hardcodeados
│   ├── pages/
│   │   └── ConstructionPage.tsx # Página de construcción
│   ├── types/
│   │   └── index.ts           # Tipos TypeScript
│   ├── App.tsx                # Componente principal con rutas
│   ├── main.tsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── package.json
├── vite.config.ts
└── README.md
```

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
- Después del login exitoso, se redirige a `/construction`
- La sesión se guarda en localStorage

