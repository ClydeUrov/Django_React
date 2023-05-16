# Django_React

Данный проект представляет собой социальную сеть, построенную на Django REST framework и React. 

## Бэкенд

Бэкенд построен на Django REST framework, который включает в себя следующие разделы: 

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "rest_framework_simplejwt.token_blacklist",
    "core",
    "core.user",
    "core.auth",
    "core.post",
    "core.comment",
] 
```

Также проработаны тесты для всех добавленных разделов.

В проекте используется Redis для переменной CACHES, а база данных PostgreSQL подключена к проекту.

## Фронтенд
Фронтенд построен на библиотеке React, используется JavaScript. Также настроен свой axios, выпадающие уведомления Toaster Navbar. Оформлено отображение профиля, постов, комментариев и аутентификации.

Для всех компонентов созданы тесты. Был создан build и отправлен на сервер.

## Деплой
Весь проект был задеплоен на сервер AWS. Бэкенд размещен на EC2, а фронтенд на S3. Также прописаны Docker и docker-compose для сервера. Подключен Nginx.

Автоматическое тестирование, загрузка и запуск новых данных на сервере происходит через Github Actions. 

Для Github Actions настроены такие переменные:
```
API_URL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
SSH_EC2_IP
SSH_EC2_USER
SSH_PASSPHRASE
SSH_PRIVATE_KEY
TEST_SECRETS 
```
В файле .env настроены такие переменные:
```
REACT_APP_API_URL
SECRET_KEY
DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
DATABASE_HOST
DATABASE_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
ENV
DJANGO_ALLOWED_HOSTS
DATABASE_URL
DATABASE_TEST_URL
CORS_ALLOWED_ORIGINS
```
