#!/bin/bash

find ./packages/api -name build -type d | while read dir; do
  parent_dir=$(dirname "$dir")
  pkg_name=$(jq -r .name <"$parent_dir/package.json")
  pkg_name=${pkg_name/@/}
  pkg_name=${pkg_name/\//-}

  echo $pkg_name

  zip -r "infrastructure/$NODE_ENV/build/$pkg_name.zip" "$dir"
done
