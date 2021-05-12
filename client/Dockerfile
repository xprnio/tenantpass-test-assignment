# 1) Node image to build assets

FROM node:14 AS builder

WORKDIR /src

COPY . . 

RUN npm install && npm run build

# 2) nginx image to serve assets

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /src/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]