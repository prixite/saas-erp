#!/usr/bin/env bash
./manage.py spectacular --file frontend/swagger.json --format openapi-json
npm run generate_api
