FROM node:16
WORKDIR /app

COPY ./dist/apps/authorization-service ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_SERVER
CMD node ./dist/main.js
