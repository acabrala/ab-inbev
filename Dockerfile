FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npx prisma migrate deploy
RUN npx prisma db seed

EXPOSE 3000

CMD ["./wait-for-db.sh", "postgres", "5432", "postgres", "npx", "prisma", "migrate", "deploy", "&&", "npm", "run", "start:dev"]
