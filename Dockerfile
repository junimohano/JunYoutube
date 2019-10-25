FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build:prod

FROM nginx:alpine

COPY --from=builder /app/dist/JunYoutube /usr/share/nginx/html
