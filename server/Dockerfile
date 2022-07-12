# server docker container

FROM node:18-alpine

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]
