FROM docker.io/node:lts-alpine
WORKDIR /app

COPY ./dist/apps/server ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_SERVER
CMD node ./dist/main.js
