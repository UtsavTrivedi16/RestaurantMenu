FROM node:12.22.12-bullseye as Cuba-image

WORKDIR /app/
COPY ./src .
COPY sbi/start.sh .