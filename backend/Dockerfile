FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root

COPY ./dbinit/init.sql /docker-entrypoint-initdb.d/
