#!/bin/bash

export $(grep -v '^#' .env | xargs)

terraform -chdir=./infrastructure apply -auto-approve ./build/terraform.out
