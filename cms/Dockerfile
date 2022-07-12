FROM node:14-alpine

RUN apk --no-cache add libpng librsvg libgsf giflib libjpeg-turbo musl && apk add vips-dev fftw-dev build-base --update-cache  --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/  --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

WORKDIR /app/cms
COPY package.json yarn.lock ./
ENV PATH /app/cms/node_modules/.bin:$PATH

RUN yarn add sharp
RUN yarn config set network-timeout 600000 -g && yarn install 

COPY . .

RUN yarn build

EXPOSE 1337

ENTRYPOINT ["yarn", "start"]
