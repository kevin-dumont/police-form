#!/bin/bash

source ./scripts/bash/setup_tf_env.sh

terraform -chdir=./infrastructure plan \
  -out=./build/terraform.out \
  -parallelism=100
