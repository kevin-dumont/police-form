export $(grep -v '^#' .env | xargs)

export REACT_APP_API_URI=$API_URI
export REACT_APP_API_KEY=$API_KEY
