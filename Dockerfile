# Etapa 1: Construcción de la aplicación React con Vite
FROM node:20.11.1-alpine3.19 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación React usando Vite
RUN npm run build

# Etapa 2: Configuración de Nginx para servir la aplicación
FROM nginx:alpine

# Elimina el contenido HTML por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos de la carpeta dist generados en la etapa de build a la carpeta que Nginx usará
COPY --from=build /app/dist /usr/share/nginx/html

# # Copiar el archivo de configuración personalizado de Nginx si es necesario
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para el tráfico HTTP
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]