FROM node:latest

EXPOSE 3000

RUN mkdir -p /app

WORKDIR /app

COPY package.json package.json

RUN npm i create-react-app -g

RUN npm install

COPY . /app

RUN cd /app

CMD npm start
