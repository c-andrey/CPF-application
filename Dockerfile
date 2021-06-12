FROM node:14

#app directory

WORKDIR /mnt/C/Users/Andrey/Desktop/Dev/teste-neoway

#app dependencies

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production

#bundle app source

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]