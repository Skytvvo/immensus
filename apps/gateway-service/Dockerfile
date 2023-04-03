FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/gateway-service ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_GATEWAY_SERVICE
CMD node ./dist/main.js
