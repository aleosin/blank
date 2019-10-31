## Blank to start new web application of most kind.

Uses Django framework to serve following:
* Sign-in/Sign-up features.
* Auto-generated admin interface on top of ORM.
* Auto-generated REST API on top of ORM.

Uses React, Redux (not yet) and Material UI:
* To build custom user-facing application.

Uses Docker to ease development and production setup.

Uses Nginx as a balancer and assets server.

Uses MySQL as a RDBMS. Might be changed to an alternative RDBMS later thanks to Django ORM.

### How to setup and run
* Setup [docker](https://www.docker.com) on Linux/Mac machine. Haven't checked on Windows, you are kindly welcome to try.
* Download source code from this repo.
* Run command `docker-compose up -d --build` to build images and up containers.
* Run command `docker-compose exec backend python manage.py migrate` to apply database migrations.
* Site should be accessible on <http://localhost> where <http://localhost/admin> application can be found.
* Run command `docker-compose exec backend python manage.py createsuperuser` to create admin user if needed.
* Also, you can look at available API endpoints via <http://localhost/api/>.
  > Note that few authentication related API's are not listed there due to specifics of Browsable API application and 'django-rest-auth' package implementation.

### How to develop
* Run command `docker-compose exec frontend yarn start` to have <http://localhost:3000> for development of SPA application with live reload feature.
* Python application also uses live reload, no special processes and ports needed.
