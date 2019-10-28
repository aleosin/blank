FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY . /usr/src/app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]