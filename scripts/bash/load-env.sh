#!/bin/bash

if [ -f .env ]; then
  while IFS='=' read -r key value; do
    key=$(echo $key | tr -d '[:space:]')

    if [[ ! $key =~ ^[[:space:]]*# && -n $key ]]; then
      value=$(echo $value | tr -d '[:space:]')

      eval export $key=\$value
    fi
  done <.env
fi
