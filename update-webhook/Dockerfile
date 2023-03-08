FROM node:18.3.0-slim as builder

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

FROM mcr.microsoft.com/playwright:v1.30.0-focal

WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/main.js"]
