FROM node:14-alpine

WORKDIR /usr/app

COPY . .
RUN npm ci
RUN npm run build

CMD ["npm", "start"]
