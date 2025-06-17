# Front-End Onboarding

Este proyecto es una aplicación web desarrollada con React, Vite y NextUI.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Git

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd front-end-onboarding
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

## Scripts Disponibles

El proyecto incluye varios scripts para diferentes entornos:

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run local` - Inicia el servidor en modo local
- `npm run prod` - Inicia el servidor en modo producción
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run preview` - Previsualiza la versión de producción localmente

## Estructura del Proyecto

```
front-end-onboarding/
├── src/               # Código fuente
├── public/           # Archivos estáticos
├── dist/             # Archivos de construcción
├── node_modules/     # Dependencias
└── ...
```

## Tecnologías Principales

- React 18
- Vite
- NextUI
- TailwindCSS
- Redux Toolkit
- React Router DOM

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Construcción para Producción

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos de construcción se generarán en el directorio `dist/`.

## Docker

El proyecto incluye configuración de Docker. Para construir y ejecutar con Docker:

```bash
docker-compose up --build
```

### Ejecución en Modo Producción con Docker

Para simular un entorno de producción usando Docker, puedes ejecutar el siguiente comando:

```bash
docker-compose up --build -d
```

Este comando:

- `--build`: Construye las imágenes de Docker
- `-d`: Ejecuta los contenedores en modo detached (en segundo plano)

Para verificar que los contenedores están corriendo:

```bash
docker-compose ps
```

Para detener los contenedores:

```bash
docker-compose down
```

## Linting

Para verificar el código con ESLint:

```bash
npm run lint
```

## Soporte

Si encuentras algún problema o tienes preguntas, por favor crea un issue en el repositorio.
