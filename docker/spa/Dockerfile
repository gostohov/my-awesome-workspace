FROM node:24-alpine AS build
WORKDIR /app

COPY package*.json nx.json ./

# Устанавливаем nx
RUN npm ci
COPY . .

# Собираем приложение
RUN npx nx build spa

FROM nginx:alpine
COPY docker/spa/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/apps/spa/browser /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
