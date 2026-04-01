FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm install
RUN npx prisma generate

COPY server.js ./
COPY src ./src

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
