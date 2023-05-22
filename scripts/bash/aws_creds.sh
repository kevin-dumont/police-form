#!/bin/bash

echo "Enter your AWS Access Key ID:"
read access_key
export AWS_ACCESS_KEY_ID=$access_key

echo "Enter your AWS Secret Access Key:"
read -s secret_key
export AWS_SECRET_ACCESS_KEY=$secret_key

echo "AWS Credentials have been set."
