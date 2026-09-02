FROM node:20-alpine

WORKDIR /usr/app

ENV CI=true
ENV WDS_SOCKET_PORT=0
ENV BROWSER=none

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]