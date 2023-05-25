export $(grep -v '^#' .env | xargs)

aws s3 sync ./packages/web/build s3://$WEB_BUCKET_NAME --delete
