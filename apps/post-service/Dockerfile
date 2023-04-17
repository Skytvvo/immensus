FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/post-service ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_POST_SERVICE
CMD node ./dist/main.js
