FROM node:12.18.2 as builder

WORKDIR /project

COPY packages/types packages/types
COPY packages/api packages/api

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install
RUN cd packages/types && yarn build
RUN cd packages/api && yarn build

CMD cd packages/api && yarn start
