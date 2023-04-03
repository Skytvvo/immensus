FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/client ./
COPY ./package*.json ./
COPY ./apps/client/index.js ./
RUN npm ci

EXPOSE $PORT_CLIENT
CMD node ./index.js
