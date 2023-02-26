## BUILD
#         docker build -t frontend:0.1.5-alpine-gcp3 -f nginx.Dockerfile .
    #     docker tag frontend:0.1.5-alpine-gcp3 chernandez05/app-frontend:0.1.5-alpine-gcp3
    #     docker push chernandez05/app-frontend:0.1.5-alpine-gcp3
## RUN
# docker run -d -p 8888:80 frontend:0.1.0-alpine

#  docker build -t backend:0.1.5 .
# docker tag backend:0.1.5 chernandez05/app-backend:0.1.5
# docker push chernandez05/app-backend:0.1.4

FROM node:16.19.0-buster as compilacion

# Metada del imagen del contenedor
LABEL email="chtello05@gmail.com" \
      developer="Cristian Hernandez"

COPY . /opt/app

ENV REACT_APP_BACKEND_BASE_URL=http://34.28.71.68:3800

WORKDIR /opt/app

RUN npm install

RUN npm run build

FROM nginx:1.22.1-alpine

## COPY nginx config

COPY --from=compilacion /opt/app/build /usr/share/nginx/html