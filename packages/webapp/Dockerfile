FROM node:12.18.2 as builder

WORKDIR /project

COPY packages/types packages/types
COPY packages/api packages/api
COPY packages/webapp packages/webapp

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install
RUN cd packages/types && yarn build
RUN cd packages/webapp && yarn build

FROM nginx
COPY --from=builder /project/packages/webapp/build /usr/share/nginx/html

