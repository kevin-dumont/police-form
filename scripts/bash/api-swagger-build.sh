#!/bin/bash

base_swagger=$(find . -type f -name "base-swagger.yaml")
swaggers=$(find "infrastructure/$NODE_ENV/api-gateway/resources/" -type f -name "swagger.yaml")

merge-yaml -i "${base_swagger}" ${swaggers} -o "infrastructure/$NODE_ENV/api-gateway/swagger.build.tmp.yaml"

swagger-merger -i "infrastructure/$NODE_ENV/api-gateway/swagger.build.tmp.yaml" -o "infrastructure/$NODE_ENV/api-gateway/swagger.build.yaml"

rm "infrastructure/$NODE_ENV/api-gateway/swagger.build.tmp.yaml"
