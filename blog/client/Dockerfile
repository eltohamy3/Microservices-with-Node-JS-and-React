# get the base image
FROM node:20-alpine

# Change the workdir 
WORKDIR /usr/app
# install some dependencies


# copy the package.json and install others
COPY package.json .
RUN npm install 

# copy the rest of files
COPY . .


EXPOSE 3000
# start up command
CMD [ "npm" , "start" ]