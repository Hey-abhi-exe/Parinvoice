# Build Stage
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY src ./src
RUN npm run build

# Production Stage
FROM node:18-alpine AS production-stage

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm install --only=production
RUN npx prisma generate

COPY --from=build-stage /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]
