# Desafio RAYA
## _Test Práctico - Laravel Full Stack_


Desafio RAYA, es una aplicación que permite crear registros desde una landing page en el home, y al mismo tiempo, brindar una cuenta de administrador y de usuario, las cuales pueden entrar cada una a su dashboard propio.

El usuario solo puede visualizar registros que sean de su misma región, mientras que, el administrador puede ver todos, crear, modificar y eliminar, tanto registros como usuarios, a los cuales, en nuevos usuarios se puede asignar un rol (admin o user).



- Se validaron los errores por required | max:255 | email | date | integer, entre otros...
- Para la validación del RUT se utilizo una dependencia y se creó una Rule
- La base de datos de Regiones Provincias y Comunas fue traspasada a un archivo SQL y se auto importa a la base de datos a través de un Seeder


## Tecnologías utilizadas

Este proyecto fue desarrollado con el siguiente stack:
##### Backend:
- [Laravel v8.75] - Desarrollo de API Rest
- [Chilean Bundle v2.1] - Dependencia para validación de RUT
- [Laravel Breeze v1.9] - Esquema de trabajo con NextJS
- [Laravel Sanctum v2.15] - Herramienta de Laravel para Autenticación API

#### Frontend:
- [Next JS v12.0.4] - Framework SSR de reactJS (Especial para SEO)
- [React v.17.0.2] - Libreria de Javascript
- [Tailwind CSS v3.0.22] - Framework de CSS y SASS.
- [Sweet Alert v.11.4.17] - Biblioteca de alerts y popups
- [React Infinite Scroll Component v6.1.0] - Componente para Infinite Scroll
- [Axios v0.21.1] - Cliente HTTP javascript
- [SWR v.1.2.2] - Hook para generar peticiones CSR

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Instalación

Desafio Raya requiere [Composer](https://getcomposer.org/download) v2+ y [Node](https://nodejs.org) para instalar la aplicación.
Además se debe contar con una base de datos MYSQL la cual se debe llamar _desafioraya_.

Para instalar la aplicación debes correr los siguientes comandos en tu consola.

```sh
git clone https://github.com/infortran/desafio-raya.git
cd desafio-raya
composer install
cp .env.example .env
php artisan key:generate
php artisan breeze:install api
```
Ya una vez copiado nuestro archivo .env, debemos editarlo para que la base de datos y las URL del Frontend comiencen a funcionar:
```sh
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```
```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=desafioraya
DB_USERNAME=root (reemplazar por los datos de tu MySQL)
DB_PASSWORD=
```
Teniendo configurada nuestra base de datos debemos migrar las tablas de la base de datos la cual incluye las tablas de Regiones Provincias y Comunas, y luego poner a trabajar el server local:

```sh
php artisan migrate --seed
php artisan serve
```
#### Frontend
Para instalar las dependencias del Frontend debes correr en tu consola:

```sh
cd frontend
npm i
npm run dev
```

en la carpeta Frontend debes hacer una copia del archivo .env.example y renombrarlo como .env.local, dentro del archivo debes escribir lo siguiente:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```
Y listo :D

Con esto la aplicación ya deberia correr sin problemas...
Desarrollado Por Freddy Perez P.