#!/bin/bash

source ./scripts/bash/setup_tf_env.sh

terraform -chdir=./infrastructure apply -auto-approve ./build/terraform.out
