FROM node:18.3.0-slim as builder

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

FROM node:18.3.0-slim as runnner
WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/main.js"]
