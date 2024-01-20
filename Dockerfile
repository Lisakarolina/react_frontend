FROM node:15.13-alpine
WORKDIR /react_frontend
COPY . .
RUN npm install --save bootstrap && npm run build