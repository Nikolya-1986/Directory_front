# The FROM node:alpine setting defines the base Docker image.
FROM node:alpine

# The WORKDIR /usr/src/app setting defines the default application directory. The defined directory is created if it does not exist.
WORKDIR /usr/src/app

# The COPY . /usr/src/app setting copies the local application files and directories to the defined directory.
COPY . /usr/src/app

# The npm install -g @angular/cli setting installs the global command line dependency for Angular.
RUN npm install -g @angular/cli

# The RUN npm install setting installs the Angular application dependencies.
RUN  npm install

# The CMD ["ng", "serve", "--host", "0.0.0.0"] setting creates and runs the Angular application for external access.
CMD [ "ng", "serve", "--host", "0.0.0.0" ]