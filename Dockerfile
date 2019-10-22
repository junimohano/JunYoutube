FROM node:8-buster-slim as builder

WORKDIR /app

COPY . .

RUN npm rebuild node-sass --force
RUN npm install && \
    npm run build:prod

FROM nginx:alpine

COPY --from=builder /app/dist/JunYoutube /usr/share/nginx/html
