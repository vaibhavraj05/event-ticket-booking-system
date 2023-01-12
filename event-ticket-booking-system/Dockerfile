FROM node:19.1.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install nodemon
COPY . /app
EXPOSE 5555
CMD [ "npm","start" ]
