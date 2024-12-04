FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-db.sh /usr/src/app/wait-for-db.sh
RUN chmod +x /usr/src/app/wait-for-db.sh
# Gere o cliente Prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
