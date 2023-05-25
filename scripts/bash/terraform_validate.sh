#!/bin/bash

. ./scripts/bash/setup_tf_env.sh

terraform -chdir=./infrastructure validate
