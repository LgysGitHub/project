#!/bin/bash

docker stop api-server
docker rm api-server es-setup
docker rmi docker-compose_api-server
docker stop reverse-proxy
docker rm reverse-proxy
docker-compose -f itu-cluster-prod.yml up -d
