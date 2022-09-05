#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A 
git commit -m "New Deployment"
git push -f git@github.com:FelipeUribe81/vue_usa_comex.git main:gh-pages


aws s3 cp --recursive dist/ s3://vue-usa-comex --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers