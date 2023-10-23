FROM node:18-slim

ARG DOCKER_TAG
ENV APP_FLAVOR=$DOCKER_TAG

WORKDIR /app

COPY src src
COPY package.json package.json


RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start"]
