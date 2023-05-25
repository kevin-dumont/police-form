#!/bin/bash

export $(grep -v '^#' .env | xargs)

terraform -chdir=./infrastructure plan \
  -out=./build/terraform.out \
  -parallelism=100
