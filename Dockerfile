FROM node:14

LABEL maintainer="Miguel Ángel Sánchez Fernández <mangel.sanfer@gmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./

CMD ["npm", "run start:prod"]