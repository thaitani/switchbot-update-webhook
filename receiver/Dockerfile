FROM node:18.3.0-slim

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

CMD [ "npm", "start" ]
