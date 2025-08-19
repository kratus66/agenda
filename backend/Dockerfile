FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Usa el binario local de nest
RUN npx nest build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]



