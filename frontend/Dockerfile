FROM node:latest as build
WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]