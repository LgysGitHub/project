FROM node:14.19.2

ARG API_SERVER_DIR
WORKDIR ${API_SERVER_DIR}

# Install app dependencies
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --loglevel verbose

# Bundle app source
COPY ./ ./

EXPOSE 5000

CMD [ "npm", "start" ]
