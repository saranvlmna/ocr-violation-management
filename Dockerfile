FROM node:20
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN npm install --production
RUN npm install -g pm2

CMD ["pm2-runtime","--name","ocr-api","node","server.js"]