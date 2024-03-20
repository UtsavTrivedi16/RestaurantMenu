FROM node:12.22.12-bullseye as restaurantmenu-image

WORKDIR /app/
COPY ./ .
RUN ls -la .
RUN npm install