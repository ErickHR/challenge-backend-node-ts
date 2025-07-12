FROM node:20.19.2

WORKDIR /home/node/app

COPY  package*.json ./
RUN npm install

COPY . .

