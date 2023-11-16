#!/bin/bash

rm -rf /usr/share/elasticsearch/plugins/analysis-ik
yes | bin/elasticsearch-plugin install file:///mnt/elasticsearch-analysis-ik-8.2.1.zip
exec /usr/local/bin/docker-entrypoint.sh elasticsearch
