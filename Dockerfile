FROM node:18.13.0-alpine3.16 as base

FROM base as init

RUN npm install -g @nestjs/cli
WORKDIR /usr/app
RUN nest new demo-user -p npm
