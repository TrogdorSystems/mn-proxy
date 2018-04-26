FROM node:8.9.3

RUN mkdir /proxy

WORKDIR /proxy

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]