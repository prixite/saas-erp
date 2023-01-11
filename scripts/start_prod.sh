#!/usr/bin/env bash
docker-compose -f docker-compose.production.yml build;
docker-compose -f docker-compose.production.yml up -d;
docker-compose -f docker-compose.production.yml exec app ./manage.py migrate;
docker-compose -f docker-compose.production.yml exec app npm run build;
docker-compose -f docker-compose.production.yml exec app ./manage.py collectstatic --noinput;
