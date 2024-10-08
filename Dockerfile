FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build && npx prisma generate

CMD [ "npm", "run", "start:dev" ]
