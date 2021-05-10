FROM node:alpine
WORKDIR /opt/app

COPY package.json ./
RUN npm install

COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src
RUN npm run build

CMD npm run start
