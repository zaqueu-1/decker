# Development stage
FROM node:20-slim AS dev
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
ENV NODE_ENV=dev
EXPOSE 3000
CMD ["npm", "start"]

# Production stage
FROM node:20-slim AS prod
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV=prod
EXPOSE 3000
CMD ["npm", "start"]
