#!/bin/bash

while IFS='=' read -r name value; do
  if [ -z "${!name:-}" ]; then
    export "$name=$value"
  fi
done <.env

terraform -chdir=./infrastructure apply -auto-approve ./build/terraform.out
