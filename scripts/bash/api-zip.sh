#!/bin/bash

# sauvegarder le répertoire de travail actuel
root_dir=$(pwd)

# créez le répertoire build s'il n'existe pas
mkdir -p "$root_dir/infrastructure/$NODE_ENV/build"

# Trouver tous les fichiers package.json dans ./packages/api
find ./packages/api/resources -name package.json -type f | while read pkg; do
  parent_dir=$(dirname "$pkg")
  pkg_name=$(jq -r .name <"$pkg")
  pkg_name=${pkg_name/@/}
  pkg_name=${pkg_name/\//-}

  echo "> $pkg_name"

  # cd dans le répertoire contenant le package.json
  cd "$parent_dir"

  # Vérifie si un répertoire de build et un fichier index.js existent avant de créer le zip
  if [ -d "./build" ] && [ -f "./build/index.js" ]; then
    cd ./build
    zip -r "$root_dir/infrastructure/$NODE_ENV/build/$pkg_name.zip" "./index.js"
  else
    echo "No build directory or index.js file found in $parent_dir, skipping."
  fi

  # Retourne au répertoire racine
  cd "$root_dir"
done
