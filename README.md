# StudyApp

Aplicación web para organizar materias (subjects), tomar notas y aplicar
herramientas de IA (resumen, explicación y preguntas) sobre el contenido
de esas notas.

------------------------------------------------------------------------

## Arquitectura

El proyecto está dividido en dos partes independientes:

    StudyApp/
    ├── backend/
    └── frontend/

------------------------------------------------------------------------

## Backend

### Tecnologías

-   Node.js
-   Express
-   MongoDB (Atlas) + Mongoose
-   JWT para autenticación
-   bcrypt para hashing de contraseñas
-   OpenAI API para procesamiento de texto

### Instalación y ejecución

``` bash
cd backend
npm install
npm run dev
```

El servidor corre por defecto en:

    http://localhost:3001

### Variables de entorno (`backend/.env`)

Crear un archivo `.env` con:

    MONGO_URI=<tu_uri_de_mongodb>
    JWT_SECRET=<tu_clave_secreta>
    OPENAI_API_KEY=<tu_api_key_de_openai_platform>

### Rutas principales

**Autenticación (públicas)**

    POST /api/register
    POST /api/login

**Subjects (protegidas)**

    GET    /api/subjects
    POST   /api/subjects
    PUT    /api/subjects/:id
    DELETE /api/subjects/:id

**Notes (protegidas)**

    GET    /api/notes?subjectId=...
    POST   /api/notes
    PUT    /api/notes/:id
    DELETE /api/notes/:id

**IA (protegidas)**

    POST /api/aiinteraction
      Body: { noteId, type: "summary" | "explanation" | "questions" }

    GET /api/aiinteraction?noteId=...

El backend genera prompts automáticamente a partir del contenido de la
nota y almacena cada interacción en MongoDB.

------------------------------------------------------------------------

## Frontend

### Tecnologías

-   Vite + React
-   Redux Toolkit
-   React Router
-   Axios
-   TailwindCSS

### Instalación y ejecución

``` bash
cd frontend
npm install
npm run dev
```

La aplicación corre en:

    http://localhost:5173

### Proxy a backend (`vite.config.js`)

El frontend redirige todas las rutas `/api/*` al backend:

``` js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3001",
      changeOrigin: true,
    },
  },
}
```

------------------------------------------------------------------------

## Funcionalidades principales

-   Registro y login con JWT
-   Persistencia de sesión en `localStorage`
-   CRUD de materias (subjects)
-   CRUD de notas por materia
-   Resumen automático de notas con IA
-   Explicación pedagógica de notas con IA
-   Generación de preguntas de estudio con IA
-   Historial de interacciones de IA por nota
-   Rutas protegidas con React Router
-   Logout

------------------------------------------------------------------------

## Flujo básico de uso

1.  Crear cuenta o iniciar sesión\
2.  Crear una materia (subject)\
3.  Crear notas dentro de esa materia\
4.  Aplicar acciones de IA sobre cada nota\
5.  Consultar historial de IA\
6.  Cerrar sesión cuando sea necesario

------------------------------------------------------------------------

## Estructura clave del frontend

    src/
    ├── api/
    ├── components/
    ├── pages/
    └── store/
        └── slices/

------------------------------------------------------------------------

## Estructura clave del backend

    backend/
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/

------------------------------------------------------------------------

## Notas finales

-   ChatGPT no da acceso a la API: es obligatorio usar una key de
    **OpenAI Platform**.
-   El sistema está diseñado para que el usuario nunca escriba prompts
    directamente.
-   Todas las operaciones de IA se basan en notas almacenadas
    previamente.
