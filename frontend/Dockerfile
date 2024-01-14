### STAGE 1: Build ###
FROM node:18 AS build
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build


### STAGE 2: Run ###
FROM nginx:1.25.1-alpine AS run
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80