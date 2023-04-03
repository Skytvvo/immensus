FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/authorization-service ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_AUTHORIZATION_SERVICE
CMD node ./dist/main.js
