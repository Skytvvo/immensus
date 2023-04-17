FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/iam-service ./dist/
COPY ./package*.json ./
RUN npm ci

EXPOSE $PORT_IAM_SERVICE
CMD node ./dist/main.js
