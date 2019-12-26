FROM node
WORKDIR /usr/src/app

# Per https://nodejs.org/de/docs/guides/nodejs-docker-webapp/, take advantage of cached Docker layers
COPY package*.json yarn.lock ./
RUN yarn

COPY . .
EXPOSE 8080
CMD [ "yarn", "serve" ]
