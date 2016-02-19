FROM node:4
MAINTAINER Fabian Köster <koesterreich@fastmail.fm>

WORKDIR /srv/src

# Copy over package.json
ADD package.json ./

# Install dependencies
RUN npm install --silent

# Copy over bower.json
ADD bower.json ./

# Bower fails when run as root, so start again with --allow-root
RUN node ./node_modules/.bin/bower --allow-root install

# Copy over remaining sources
COPY . ./

# Start the web application server
CMD node server.js

# The port(s) the web application uses
EXPOSE 5000

VOLUME /data
