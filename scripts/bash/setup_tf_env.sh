export $(grep -v '^#' .env | xargs)

export TF_VAR_AWS_REGION=$AWS_REGION
export TF_VAR_API_KEY=$API_KEY
export TF_VAR_WEB_BUCKET_NAME=$WEB_BUCKET_NAME
export TF_VAR_WEB_API_KEY=$WEB_API_KEY
