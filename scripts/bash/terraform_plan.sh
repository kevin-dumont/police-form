#!/bin/bash

while IFS='=' read -r name value; do
  if [ -z "${!name:-}" ]; then
    export "$name"="$value"
  fi
done <.env

terraform -chdir=./infrastructure plan \
  -out=./build/terraform.out \
  -parallelism=100 \
  -lock=false
