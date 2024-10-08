FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npx prisma generate && npm run build

CMD [ "npm", "run", "start:dev" ]
