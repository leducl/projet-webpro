# Étape 1: Build de l'application Angular 
FROM node:24 as build 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2: Serveur web pour servir les fichiers statiques 
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80