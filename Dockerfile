FROM node:16

WORKDIR /app

COPY package*.json ./

COPY . .

RUN rm -rf node_modules
RUN npm ci --only=production

EXPOSE 5000
CMD [ "node", "app.js" ]