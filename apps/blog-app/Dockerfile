FROM node:16-alpine
WORKDIR /app

COPY ./dist/apps/blog-app ./
COPY ./package*.json ./
COPY ./apps/blog-app/index.js ./
RUN npm ci

EXPOSE $PORT_BLOG_APP
CMD node ./index.js
