FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip pdo_mysql

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html && a2enmod rewrite

WORKDIR /var/www/html

EXPOSE 80


