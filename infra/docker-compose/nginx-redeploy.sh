#!/bin/bash

docker stop api-server
docker rm es-setup
docker stop reverse-proxy
docker rm reverse-proxy
docker-compose -f itu-cluster-dev.yml up -d
