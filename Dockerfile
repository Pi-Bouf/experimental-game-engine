FROM node:22.21.1-alpine3.21 AS base
WORKDIR /app
COPY . /app
ENV ASSETS_URL=/
RUN yarn install; yarn parcel build example/index.html

FROM base AS server
WORKDIR /app
COPY --from=base /app/dist /app
COPY --from=base /app/assets /app
RUN npm install -g http-server

EXPOSE 80
CMD ["http-server", "/app", "-d", "-i", "--cors", "-p", "80"]