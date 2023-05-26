# Get base swagger
base_swagger=$(find . -type f -name "base-swagger.yaml")

#Get all swaggers in api gateway folder
swaggers=$(find packages/api/ -type f -name "swagger.yaml")

# Merge all swagger file
merge-yaml -i ${base_swagger} ${swaggers} -o packages/api/infrastructure/api-gateway/swagger/tmp_merge.yaml

#Build swagger ref
swagger-merger -i packages/api/infrastructure/api-gateway/swagger/tmp_merge.yaml -o packages/api/infrastructure/api-gateway/swagger/tf_swagger.yaml

#Delete tmp
rm packages/api/infrastructure/api-gateway/swagger/tmp_merge.yaml
