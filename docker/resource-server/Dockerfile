FROM node:24-alpine AS deps
WORKDIR /app

# Набор файлов, достаточный для npm ci в Nx-монорепо
COPY package*.json nx.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Собираем Nest app через Nx
RUN npx nx build resource-server

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Переносим зависимости и вычищаем dev
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
RUN npm prune --omit=dev

# Артефакты сборки
COPY --from=build /app/dist/apps/resource-server ./dist

# Если приложению нужны prisma/schema и миграции в рантайме, раскомментируй:
# COPY --from=build /app/apps/resource-server/prisma ./apps/resource-server/prisma

COPY docker/traefik/dynamic/certs/rootCA.crt /etc/ssl/my-awesome-workspace/rootCA.crt

# Nest обычно слушает 3000 (проверь свой main.ts)
EXPOSE 3000

CMD ["node", "dist/main.js"]
