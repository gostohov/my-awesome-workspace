FROM postgres:16

# Копируем SQL-скрипт в директорию автозапуска
COPY 01-create-databases.sql /docker-entrypoint-initdb.d/01-create-databases.sql

# (опционально) выставить права
RUN chmod 644 /docker-entrypoint-initdb.d/01-create-databases.sql
