# Proyecto AventID

## Introducción

AventID es una aplicación diseñada para [descripción breve del propósito y funcionalidades principales].

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/hooks**: Contiene hooks personalizados como `useSession`, `useAvatar`, `useCookie`, etc.
- **src/router**: Define las rutas públicas y privadas de la aplicación.
- **src/services**: Incluye servicios para interactuar con la API, como `Http` y `AxiosRequest`.
- **src/pages**: Contiene las diferentes páginas de la aplicación, organizadas en públicas y privadas.
- **src/components**: Componentes reutilizables como `LoadingScreen` y `PasswordStrengthMeter`.

## Componentes Clave

### Hooks

- **useSession**: Maneja la sesión del usuario, incluyendo inicio de sesión, cierre de sesión y actualización de la sesión.
- **useAvatar**: Gestiona la obtención y visualización del avatar del usuario.
- **useCookie**: Proporciona métodos para manipular cookies.
- **usePermission**: Verifica permisos de usuario y construye rutas dinámicas.

### Validators

- **PermissionGate**: Controla el acceso a componentes basados en permisos de usuario.
- **DisableGate**: Deshabilita componentes si el usuario no tiene permisos.

## Sistema de Rutas

### Rutas Públicas y Privadas

- **PublicRouter**: Gestiona las rutas accesibles sin autenticación.
- **PrivateRouter**: Gestiona las rutas que requieren autenticación.

### Rutas Dinámicas

Las rutas se construyen dinámicamente basadas en la sesión del usuario y los permisos asignados.

## Servicios y Casos de Uso

- **Http**: Método para realizar peticiones HTTP a la API.
- **AxiosRequest**: Clase para manejar peticiones HTTP con autenticación y manejo de tokens.

## Configuración y Ejecución

Para configurar y ejecutar el proyecto localmente:

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el proyecto con `npm start`.

## Contribución

Si deseas contribuir al proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
# one-service-domicilios-web-app
# OnBoarding-Front-End
