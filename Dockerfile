FROM node:18-slim

WORKDIR App

COPY src src
COPY package.json package.json


RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start"]