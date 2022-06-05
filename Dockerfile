FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/


# Install app dependencies
RUN yarn install
COPY . .

ENV DATABASE="postgresql://vote4mee:AVNS_pjO3oW5mJ5KOiDT@db-postgresql-teqie1-do-user-11386859-0.b.db.ondigitalocean.com:25060/vote4me?sslmode=require"

RUN yarn run build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY . .

EXPOSE 5000
CMD [ "yarn", "start:dev" ]