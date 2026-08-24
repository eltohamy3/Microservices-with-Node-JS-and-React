
# specify a base image
FROM node:20-alpine    

WORKDIR /usr/app

#install some dependencies

COPY ./package.json ./
RUN npm install

COPY . .
# Default command 
CMD [ "npm"  , "start"]


