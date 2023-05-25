#!/bin/bash

export $(grep -v '^#' .env | xargs)

terraform -chdir=./infrastructure validate
