FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/profile-service ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_PROFILE_SERVICE
CMD node ./dist/main.js
