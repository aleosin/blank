## Blank to start new web application of most kind.

Uses [Django framework](https://www.djangoproject.com) to serve following:
* Sign-in/Sign-up features.
* Auto-generated admin interface on top of ORM.

Uses [Django REST framework](https://www.django-rest-framework.org) for:
* Auto-generated REST API on top of ORM.

Uses [django-rest-auth](https://django-rest-auth.readthedocs.io/en/latest/) and [django-allauth](https://django-allauth.readthedocs.io/en/latest/) to provide REST endpoints for Sign-in/Sign up features.

Uses following to build custom user-facing application:
* [React](https://reactjs.org) as a framework for how things look and automatically display data on its change.
* [Material UI](https://material-ui.com) as a library of commonly used components.
* [Formik](https://jaredpalmer.com/formik) and [formik-material-ui](https://github.com/stackworx/formik-material-ui) to Material UI for handling forms.
* [Yup](https://github.com/jquense/yup) for forms schema validation.
* [React-Redux](https://react-redux.js.org), [Redux-Actions](https://redux-actions.js.org) and [Redux-Saga](https://redux-saga.js.org) as a solution for state management.
* [Axios](https://github.com/axios/axios) as an HTTP client.

Uses [Docker](https://www.docker.com) to ease development and production setup.

Uses [Nginx](http://nginx.org) as a balancer and assets server.

Uses [MySQL](https://www.mysql.com) as a RDBMS. Might be changed to an alternative RDBMS later thanks to Django ORM.

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
* Python application also uses live reload, no dedicated processes and ports needed.

### Supported features
* You can sign up (no confirmation emails for the moment)
* You can sign in either with previously signed up account or superuser account created from `createsuperuser` (see command above)
* You can sign out then

To be continued.
