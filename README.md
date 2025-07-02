# Proyecto Agenda

Este proyecto es una aplicación fullstack con **NestJS** (backend) y **Next.js** (frontend).

## 📂 Estructura del proyecto

Proyecto Agenda/
├── backend/ -> Servidor NestJS
└── frontend/ -> Aplicación Next.js

yaml
Copiar
Editar

---

## 🚀 Requisitos

- Node.js >= 18.x
- npm >= 9.x (o usar [pnpm](https://pnpm.io) o [yarn](https://yarnpkg.com))
- PostgreSQL (si tu backend Nest usa base de datos)
- (Opcional) Docker, si planeas levantar los servicios con contenedores

---

## 🔧 Instalación del backend (NestJS)

1. Navega a la carpeta del backend:

   ```bash
   cd backend
Instala las dependencias:

bash
Copiar
Editar
npm install
Configura las variables de entorno. Crea un archivo .env en la carpeta backend/ con tus credenciales. Por ejemplo:

ini
Copiar
Editar
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_db
JWT_SECRET=tu_secreto
PORT=3001
Corre las migraciones (si aplicas TypeORM con sincronización desactivada) o crea manualmente las tablas.

Ejecuta el servidor NestJS en desarrollo:

bash
Copiar
Editar
npm run start:dev
El backend estará disponible en http://localhost:3001 (o el puerto configurado).

🔧 Instalación del frontend (Next.js)
Abre una nueva terminal y navega a la carpeta del frontend:

bash
Copiar
Editar
cd frontend
Instala las dependencias:

bash
Copiar
Editar
npm install
Configura las variables de entorno. Crea un archivo .env.local en la carpeta frontend/ con la URL de tu backend:

ini
Copiar
Editar
NEXT_PUBLIC_API_URL=http://localhost:3001
Ejecuta el servidor de desarrollo de Next.js:

bash
Copiar
Editar
npm run dev
La aplicación estará disponible en http://localhost:3000 (o el puerto configurado).

✅ Scripts útiles
En el backend (backend/):

npm run start:dev – Inicia Nest en modo desarrollo.

npm run build – Compila el proyecto.

npm run start:prod – Arranca el servidor en modo producción.

En el frontend (frontend/):

npm run dev – Inicia Next.js en modo desarrollo.

npm run build – Construye la app para producción.

npm start – Arranca la app Next.js en modo producción.

⚙️ Compilación y ejecución en producción
En backend/, construye el proyecto:

bash
Copiar
Editar
npm run build
Ejecuta el servidor en producción:

bash
Copiar
Editar
npm run start:prod
En frontend/, construye la app:

bash
Copiar
Editar
npm run build
Corre Next.js en producción:

bash
Copiar
Editar
npm start
