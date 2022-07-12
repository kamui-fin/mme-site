# client docker container
FROM node:18-alpine

RUN apk add curl

RUN mkdir -p /app/client

WORKDIR /app/client
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
