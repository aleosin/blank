FROM node:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx \
    && rm -rf /var/lib/apt/lists/*

RUN rm -f /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/conf.d

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/spa
RUN yarn install
RUN yarn build

EXPOSE 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]