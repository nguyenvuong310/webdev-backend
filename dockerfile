FROM node:18-alpine AS development

WORKDIR /app

COPY package.json  package-lock.json*  ./

RUN npm ci

################################
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=developement /app/node_modules ./node_modules

COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force


################################
FROM node:18-alpine AS production
WORKDIR /app

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

USER node

CMD ["node", "dist/main.js"]
