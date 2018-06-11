FROM node

COPY . /app/boos

WORKDIR /app/boos

RUN npm install

CMD [ "npm", "start" ]