## BUILD
# docker build -t frontend:0.1.0-alpine -f nginx.Dockerfile .
## RUN
# docker run -d -p 8888:80 frontend:0.1.0-alpine

FROM node:16.19.0-buster as compilacion
# Metada del imagen del contenedor
LABEL email="chtello05@gmail.com" \
      developer="Cristian Hernandez"

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build