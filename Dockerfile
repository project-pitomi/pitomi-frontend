# Install dependencies only when needed
FROM node:alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

EXPOSE 3000

COPY public public
COPY src src
RUN npx next build

CMD ["npx", "next", "start"]